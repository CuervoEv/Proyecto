from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware  # <--- Importa esto
from metodos import auth, homes, miembros, tareas, actividades

app = FastAPI()

# Configuración CORS - Coloca esto DESPUÉS de crear app y ANTES de los routers
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # Origen de Angular
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # Incluye OPTIONS
    allow_headers=["*"],  # Permite todos los headers
)

# Tus routers
app.include_router(auth.router, prefix="/Sesion")
app.include_router(homes.router, prefix="/hogares")
app.include_router(miembros.router, prefix="/miembros")
app.include_router(tareas.router, prefix="/tareas")
app.include_router(actividades.router, prefix="/actividades")

@app.get("/")
def root():
    return {"mensaje": "API funcionando"}