#!/bin/bash

# Variables de conexión a MySQL
MYSQL_USER=""
MYSQL_PASSWORD=""

# Ejecutar el script SQL
echo "Ejecutando script SQL..."
mysql -u $MYSQL_USER -p$MYSQL_PASSWORD < backend/db/database.sql
echo "Script SQL ejecutado."

echo "Iniciando instalación y ejecución en backend..."
cd backend
npm install
npm run dev &
echo "Backend en ejecución..."

cd ..
echo "Iniciando instalación y ejecución en frontend..."
cd frontend
npm install
npm run dev &
echo "Frontend en ejecución..."

wait