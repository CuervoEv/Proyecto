<!-- # 🔐 Autenticación

## Login
Formulario para iniciar sesión con email y contraseña.

## Registro
Formulario para crear una cuenta nueva.

## Recuperar contraseña
Formulario para restablecer contraseña olvidada.

--- -->

<!-- # 👤 Área de Usuario

## Dashboard
Página principal después de login. Muestra resumen y estadísticas.

## Perfil
Ver y editar información personal del usuario.

## Configuración
Ajustes de tema, notificaciones y preferencias.

--- -->

# ⚙️ Módulo Principal

## Listado
Muestra todos los elementos en tabla o cards. Permite buscar, filtrar, editar y eliminar.

---

# 🛡️ Admin

## Panel Admin
Dashboard con métricas globales del sistema.

## Usuarios
Gestionar todas las cuentas de usuarios (editar, eliminar, cambiar roles).

---

# ℹ️ Páginas Informativas

## About
Información del proyecto o empresa.

## Servicios
Lista de servicios o funcionalidades ofrecidas.

## Contacto
Formulario de contacto e información de contacto.

### APIS 

Aquí tienes la especificación de tus endpoints organizada en **Markdown** para que sea más clara y legible:


# 📌 API Hogar – Endpoints

## 1. Autenticación y usuarios
- **POST** `/auth/register` → Registra un nuevo usuario. Body: { nombre, correo, contraseña } ✅  
- **POST** `/auth/login` → Inicia sesión. Body: { correo, contraseña }. Devuelve token JWT y datos básicos ✅  
- **GET** `/auth/me` → Obtiene perfil del usuario autenticado ✅  
- **PUT** `/auth/me` → Actualiza nombre o correo del usuario ✅  

---

## 2. Hogares
- **GET** `/hogares` → Lista hogares del usuario.  
- **POST** `/hogares` → Crea hogar. Body: { nombre_hogar, nombre_admin }.  
- **GET** `/hogares/{idHogar}` → Detalles de un hogar.  
- **PUT** `/hogares/{idHogar}` → Actualiza nombre del hogar (solo propietario).  
- **DELETE** `/hogares/{idHogar}` → Elimina hogar (restricciones según datos).  

---

## 3. Miembros
- **GET** `/hogares/{idHogar}/miembros` → Lista miembros del hogar.  
- **POST** `/hogares/{idHogar}/miembros` → Agrega miembro. Body: { nombre, es_admin, preferencias_alimenticias }.  
- **GET** `/miembros/{idMiembro}` → Detalles de un miembro.  
- **PUT** `/miembros/{idMiembro}` → Actualiza datos del miembro.  
- **DELETE** `/miembros/{idMiembro}` → Elimina miembro (solo administradores).  
- **GET** `/miembros/{idMiembro}/configuracion` → Obtiene permisos.  
- **PUT** `/miembros/{idMiembro}/configuracion` → Actualiza permisos.  

---

## 4. Tareas del hogar
- **GET** `/hogares/{idHogar}/tareas` → Lista tareas del hogar.  
- **POST** `/hogares/{idHogar}/tareas` → Crea tarea. Body: { nombre, descripcion, duracion_estimada_minutos, solo_adulto? }.  
- **PUT** `/tareas/{idTarea}` → Actualiza tarea.  
- **DELETE** `/tareas/{idTarea}` → Elimina tarea.  
- **POST** `/tareas/{idTarea}/asignar` → Asigna tarea. Body: { id_miembro, fecha, hora, duracion_minutos, repetitiva }.  
- **PUT** `/asignaciones/{idAsignacion}/completar` → Marca tarea como realizada.  
- **GET** `/miembros/{idMiembro}/tareas/pendientes` → Lista tareas pendientes del miembro.  

---

## 5. Actividades personales
- **GET** `/miembros/{idMiembro}/actividades` → Lista actividades.  
- **POST** `/miembros/{idMiembro}/actividades` → Crea actividad. Body: { repetitiva_semanal, hora, dias_semana, duracion_minutos, economica }.  
- **PUT** `/actividades/{idActividad}` → Actualiza actividad.  
- **DELETE** `/actividades/{idActividad}` → Elimina actividad.  

---

## 6. Inventario de ingredientes
- **GET** `/hogares/{idHogar}/stock` → Stock actual.  
- **GET** `/hogares/{idHogar}/stock/alertas` → Alertas de stock bajo.  
- **GET** `/hogares/{idHogar}/stock/proximos-caducar?dias=7` → Próximos a caducar.  
- **POST** `/hogares/{idHogar}/stock/agregar` → Agregar stock. Body: { id_tipo_ingrediente, cantidad, id_unidad, fecha_caducidad? }.  
- **POST** `/hogares/{idHogar}/stock/consumir` → Consumir ingredientes. Body: { consumos: [...] }.  
- **GET** `/tipos-ingredientes` → Catálogo de ingredientes.  
- **POST** `/tipos-ingredientes` → Agregar tipo de ingrediente (admin).  
- **GET** `/clasificaciones` → Lista clasificaciones.  
- **GET** `/unidades-medida` → Lista unidades de medida.  

---

## 7. Gastos y economía
- **GET** `/miembros/{idMiembro}/gastos` → Lista gastos personales.  
- **POST** `/miembros/{idMiembro}/gastos` → Registra gasto. Body: { titulo, descripcion, valor_aproximado }.  
- **GET** `/hogares/{idHogar}/reporte-gastos` → Reporte de gastos por miembro. Query: { fecha_inicio, fecha_fin }.  

---

## 8. Mensualidades
- **GET** `/hogares/{idHogar}/mensualidades` → Lista mensualidades.  
- **POST** `/hogares/{idHogar}/mensualidades` → Crea mensualidad. Body: { valor_aproximado, dias_repeticion, fecha_cancelacion? }.  
- **PUT** `/mensualidades/{idMensualidad}/pagar` → Pagar mensualidad. Body: { fecha_pago }.  
- **DELETE** `/mensualidades/{idMensualidad}` → Elimina mensualidad.  

---

## 9. Seguimiento médico
- **GET** `/miembros/{idMiembro}/seguimientos` → Lista registros médicos.  
- **POST** `/miembros/{idMiembro}/seguimientos` → Crea registro. Body: { fecha, estado, nota }.  
- **PUT** `/seguimientos/{idSeguimiento}` → Actualiza registro.  
- **DELETE** `/seguimientos/{idSeguimiento}` → Elimina registro.  

---

## 10. Utilidades y reportes
- **GET** `/hogares/{idHogar}/dashboard` → Resumen general (tareas, stock, pagos).  
- **POST** `/tareas/recurrentes/generar` → Genera tareas recurrentes.  
- **GET** `/miembros/disponibilidad?fecha=...` → Miembros disponibles en un hogar.  
```markdown