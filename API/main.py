from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from metodos import auth , homes , miembros, tareas

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/Sesion")
app.include_router(homes.router, prefix="/hogares")
app.include_router(miembros.router, prefix="/miembros")
app.include_router(tareas.router, prefix="/tareas")