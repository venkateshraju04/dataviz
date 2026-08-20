import os
import base64
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import shutil

# Import the existing graph
from graph import graph

app = FastAPI(title="Data Analysis API")

# Configure CORS so the React frontend can communicate with the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Data Analysis API"}

@app.post("/api/analyze")
async def analyze_data(
    file: UploadFile = File(...),
    query: str = Form(...)
):
    try:
        # Save the uploaded file temporarily
        temp_file_path = f"temp_{file.filename}"
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Clean up old plot if exists
        plot_path = "output_plot.png"
        if os.path.exists(plot_path):
            os.remove(plot_path)

        # Prepare the initial state
        initial_state = {
            "query": query,
            "dataset_path": temp_file_path
        }

        # Invoke the AI graph
        final_state = graph.invoke(initial_state)

        # Read the plot if generated
        plot_base64 = None
        if os.path.exists(plot_path):
            with open(plot_path, "rb") as image_file:
                plot_base64 = base64.b64encode(image_file.read()).decode('utf-8')

        # Clean up temporary dataset
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)

        return {
            "success": True,
            "analysis": final_state.get("analysis", "No analysis generated."),
            "generated_code": final_state.get("generated_code", ""),
            "plot": plot_base64,
            "error": final_state.get("error", None)
        }

    except Exception as e:
        # Ensure cleanup in case of error
        if 'temp_file_path' in locals() and os.path.exists(temp_file_path):
            os.remove(temp_file_path)
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)
