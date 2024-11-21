import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ToastController } from '@ionic/angular'; // Usamos el ToastController para mostrar mensajes emergentes

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage implements OnInit {
  capturedImage: string | undefined;

  constructor(private toastController: ToastController) { }

  ngOnInit() {}

  async captureImage(source: CameraSource) {
    try {
      const image = await Camera.getPhoto({
        quality: 90,                         // Calidad de la imagen
        resultType: CameraResultType.DataUrl, // Formato como Data URL
        source: source,                      // Fuente: Cámara o Galería
      });

      this.capturedImage = image.dataUrl; // Guardamos la imagen para mostrarla
    } catch (error) {
      this.showToast('Error al capturar la imagen: ' + error);
    }
  }

  // Mostrar mensaje de error al usuario
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
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
}
