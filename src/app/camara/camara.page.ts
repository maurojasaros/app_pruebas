import { Component, ViewChild, ElementRef, AfterViewInit, HostListener, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ToastController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage implements AfterViewInit {
  capturedImage: string | undefined;
  canvasWidth: number = 300; // Ancho del canvas (opcional)
  canvasHeight: number = 300; // Alto del canvas (opcional)

  // Variables para guardar las dimensiones originales de la imagen
  originalWidth: number | undefined;
  originalHeight: number | undefined;

  @ViewChild('canvas', { static: false }) canvas!: ElementRef;

  constructor(
    private toastController: ToastController,
    private menu: MenuController,
    private navController: NavController,
    private router: Router
  ) {}

  ngOnInit() {
    this.menu.close("mainMenu");
  }

  abrirMenu() {
    this.menu.open('mainMenu');
  }

  ngAfterViewInit() {
    console.log('Canvas cargado', this.canvas);
    this.setCanvasSize(); // Ajustar el tamaño del canvas cuando se cargue la vista
  }

  // Método para escuchar el cambio de tamaño de la ventana
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.setCanvasSize();
  }

  // Establecer el tamaño del canvas para que sea responsivo (opcional)
  setCanvasSize() {
    if (this.canvas) {
      const canvasElement = this.canvas.nativeElement;
      
    }
  }

  async captureImage(source: CameraSource) {
    try {
      const image = await Camera.getPhoto({
        quality: 100, // Usar calidad máxima
        resultType: CameraResultType.DataUrl,
        source: source,
      });

      this.capturedImage = image.dataUrl; // Guardamos la imagen para mostrarla
      this.drawImageOnCanvas(); // Dibujamos la imagen en el canvas después de capturarla
    } catch (error) {
      this.showToast('Error al capturar la imagen: ' + error);
    }
  }

  // Mostrar mensaje de error al usuario
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  // Capturar desde la cámara
  async captureFromCamera() {
    await this.captureImage(CameraSource.Camera);
  }

  // Capturar desde la galería
  async captureFromGallery() {
    await this.captureImage(CameraSource.Photos);
  }

  // Dibujar la imagen capturada en el canvas
  drawImageOnCanvas() {
    if (this.canvas && this.capturedImage) {
      const img = new Image();
      img.src = this.capturedImage;
      img.onload = () => {
        const ctx = this.canvas.nativeElement.getContext('2d');

        // Aseguramos que el canvas tenga el tamaño de la imagen capturada
        const canvas = this.canvas.nativeElement;
        canvas.width = img.width;  // Establecer el ancho del canvas al de la imagen
        canvas.height = img.height; // Establecer la altura del canvas al de la imagen

        // Guardar las dimensiones originales de la imagen
        this.originalWidth = img.width;
        this.originalHeight = img.height;

        // Dibujar la imagen sin cambiar su tamaño
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas antes de dibujar
        ctx.drawImage(img, 0, 0, img.width, img.height); // Dibujar la imagen en su tamaño original
      };
    }
  }

  // Función para aplicar un filtro a la imagen (distintos filtros)
  applyFilter(filter: string) {
    if (this.canvas && this.capturedImage) {
      const img = new Image();
      img.src = this.capturedImage;
      img.onload = () => {
        const ctx = this.canvas.nativeElement.getContext('2d');
        ctx.drawImage(img, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

        // Aplicar el filtro seleccionado
        ctx.filter = filter; // Filtrar con el filtro pasado como parámetro
        ctx.drawImage(img, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
      };
    }
  }

  // Funciones específicas para cada filtro
  applyGrayscale() {
    this.applyFilter('grayscale(100%)');
  }

  applySepia() {
    this.applyFilter('sepia(100%)');
  }

  applyInvert() {
    this.applyFilter('invert(100%)');
  }

  applyBlur() {
    this.applyFilter('blur(5px)');
  }

  applyContrast() {
    this.applyFilter('contrast(150%)');
  }

  applySaturate() {
    this.applyFilter('saturate(200%)');
  }

  applyBrightness() {
    this.applyFilter('brightness(150%)');
  }

  // Restaurar la imagen al tamaño original sin filtros aplicados
  restoreOriginal() {
    if (this.originalWidth && this.originalHeight && this.capturedImage) {
      const img = new Image();
      img.src = this.capturedImage;
      img.onload = () => {
        const ctx = this.canvas.nativeElement.getContext('2d');
        if (ctx) {
          this.canvas.nativeElement.width = this.originalWidth; // Restaurar el tamaño original
          this.canvas.nativeElement.height = this.originalHeight;
          ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height); // Limpiar antes de dibujar
          ctx.drawImage(img, 0, 0, this.originalWidth, this.originalHeight); // Redibujar la imagen sin filtros
        }
      };
    }
  }
}
