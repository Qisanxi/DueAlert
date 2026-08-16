from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import init_firebase
from app.routers import centers, student as students, messages, dashboard


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    init_firebase()
    yield
    # Shutdown (nothing to clean up for Firestore)


def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.VERSION,
        lifespan=lifespan,
    )
    
    # CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    # Routers
    app.include_router(centers.router)
    app.include_router(students.router)
    app.include_router(messages.router)
    app.include_router(dashboard.router)
    
    @app.get("/")
    def root():
        return {"message": f"{settings.PROJECT_NAME} is running", "version": settings.VERSION}
    
    @app.get("/health")
    def health():
        from datetime import datetime
        return {"status": "healthy", "timestamp": datetime.now().isoformat()}
    
    return app


app = create_app()