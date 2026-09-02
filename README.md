# AutoArchive — Archivo Histórico de Superdeportivos

Aplicación web interactiva dedicada a la historia, planos técnicos y monografías documentales de los vehículos más icónicos del automovilismo mundial.

---

## 🛠️ Cómo solucionar el error «404 Page Not Found» en GitHub Pages

El error **404 Page Not Found** en GitHub ocurre cuando el repositorio aún no tiene activada la fuente de despliegue correcta en los ajustes de GitHub.

Sigue estos **3 sencillos pasos** para activarlo:

1. **Entra a tu repositorio en GitHub** y haz clic en la pestaña **⚙️ Settings** (Ajustes) en la parte superior derecha.
2. En el menú lateral izquierdo, selecciona **Pages** (o ve a `https://github.com/TU-USUARIO/TU-REPO/settings/pages`).
3. En la sección **Build and deployment**:
   - En el desplegable **Source** (Fuente), cambia de *«Deploy from a branch»* a **«GitHub Actions»**.
4. Ve a la pestaña **Actions** de tu repositorio:
   - Verás el flujo **Deploy to GitHub Pages** ejecutándose automáticamente.
   - En 1-2 minutos terminará con un icono verde (✓) y te proporcionará la URL pública activa (ej. `https://tu-usuario.github.io/tu-repo/`).

---

## 💻 Ejecución en local

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Compilar para producción
npm run build
```

