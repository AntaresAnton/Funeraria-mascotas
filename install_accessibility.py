import os
import glob

def install_accessibility_widget():
    # Directorio actual (raíz del proyecto)
    root_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Buscar todos los archivos HTML
    html_files = glob.glob(os.path.join(root_dir, "*.html"))
    
    # Script a inyectar
    script_tag_str = '\n    <!-- Accessibility Widget -->\n    <script src="js/accessibility.js"></script>\n</body>'
    
    print(f"Buscando archivos HTML en: {root_dir}")
    count = 0
    
    for file_path in html_files:
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()

            filename = os.path.basename(file_path)

            # Verificar si ya está instalado
            if "js/accessibility.js" in content:
                print(f"[OMITIDO] Ya instalado en: {filename}")
                continue

            # Usar reemplazo simple de </body>
            if "</body>" in content:
                new_content = content.replace("</body>", script_tag_str)
                
                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(new_content)
                    
                print(f"[INSTALADO] En: {filename}")
                count += 1
            else:
                print(f"[ADVERTENCIA] No se encontró </body> en: {filename}")

        except Exception as e:
            print(f"[ERROR] Fallo al procesar {file_path}: {e}")

    print(f"\nProceso completado. Widget instalado en {count} archivos.")

if __name__ == "__main__":
    install_accessibility_widget()
