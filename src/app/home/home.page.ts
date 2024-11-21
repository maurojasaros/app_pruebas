import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, MenuController, NavController } from '@ionic/angular';
import { AuthServiceService } from '../services/auth-service.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  // Estado actual de la segmentación (por defecto "perfil")
  selectedSegment: string = 'perfil';
  email: string = '';
  nombre: string = '';
  apellido: string = '';
  nivelEducacion: string = '';
  fechaNacimiento: string = '';
  isAnimating: boolean = false;

  
  
  // Componentes a mostrar según el segmento
  components: any = {
    perfil: 'Mis Datos',  // Este componente es 'Mis Datos'
    experiencias: 'Experiencia Laboral', // Este componente es 'Experiencia Laboral'
    certificaciones: 'Certificaciones', // Este componente es 'Certificaciones'
  };

  // Array de juegos
  juegos: { titulo: string; precio: number; descripcion: string; imagen: string; ruta?: string }[] = [
    { titulo: 'Terror', precio:1 , descripcion: 'Sumérgete en la oscuridad con los juegos de terror, donde cada susurro y sombra puede esconder el peligro. Prepárate para un viaje escalofriante que desafiará tus nervios y pondrá a prueba tu instinto de supervivencia en escenarios aterradores.', imagen: 'assets/img/Terror.jpg', ruta: '/terror'},
    { titulo: 'Deportes', precio: 2, descripcion: 'Los juegos de deportes te permiten sentir la emoción de la competencia y la gloria de la victoria sin salir de casa. Desde driblar en la cancha hasta hacer un gol decisivo, cada partido es una oportunidad para demostrar tus habilidades y llevar a tu equipo a la cima.', imagen: 'assets/img/Deportes.jpg', ruta: '/deportes'},
    { titulo: 'Aventuras', precio: 3, descripcion: 'Los juegos de aventura son un pasaporte a mundos extraordinarios donde la curiosidad es tu mejor aliada. Cada paso te lleva a descubrir misterios, resolver acertijos intrigantes y vivir historias emocionantes que te atraparán desde el primer momento.', imagen: 'assets/img/Aventuras.jpg', ruta: '/aventuras'},
  ];

  
  // Array de productos (juegos)
  productos = [
    { nombre: 'Outlast', precio: 20.999, enStock: true },
    { nombre: 'Final Fantasy XII', precio: 30.999, enStock: false },
    { nombre: 'The legend of Zelda', precio: 49.699, enStock: true },
    { nombre: 'UFC', precio: 15.999, enStock: false },
    { nombre: 'Call of Duty', precio: 10.799, enStock: true }
  ];

  constructor(
    private route: ActivatedRoute, 
    private alertController: AlertController, 
    private menu: MenuController,
    private navCtrl: NavController, // Agregado para la navegación
    private router: Router,  // Para redirigir al cambiar de segmento
    private authService: AuthServiceService
  ) {}


  

  abrirMenu() {
    this.menu.open('mainMenu');
    
  }
  
  async ngOnInit() {
    
    this.menu.close("mainMenu");  // Cierra el menú al cargar la página
  
    // Obtener el email del usuario activo desde el servicio
    const activeEmail = await this.authService.getActiveUserEmail();
  
    // Asegurarte de que email no sea null
    this.email = activeEmail || ''; // Si activeEmail es null, asignamos un string vacío
  
    console.log('Email obtenido desde el authService:', this.email);  // Para depuración
  }

  

  // Método para mostrar alerta con la información del usuario
  async mostrarInformacion() {
    const alert = await this.alertController.create({
      header: 'Información del Usuario',
      message: `Su nombre es: ${this.nombre} ${this.apellido}`,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Método para limpiar campos
  limpiarCampos() {
    this.isAnimating = true; // Activa la animación
    setTimeout(() => {
      this.nombre = '';
      this.apellido = '';
      this.nivelEducacion = '';
      this.fechaNacimiento = '';
      this.isAnimating = false; // Desactiva la animación
    }, 1000); // Duración de la animación
  }

  // Método para mostrar alerta sobre el stock del producto
  async mostrarAlerta(producto: any) {
    const alert = await this.alertController.create({
      header: 'Estado del Juego',
      message: producto.enStock ? 'El Juego está en stock' : 'El Juego no está en stock',
      buttons: ['OK']
    });
    await alert.present();
  }

  // Método para navegar a la página de cada categoría
  navigateToCategory(category: string) {
    if (category) {
      this.navCtrl.navigateForward(`/${category}`);
    } else {
      // Maneja el caso en que category es undefined
      console.warn('La categoría no está definida');
    }
  }

  // Método de redirección para cargar el perfil de los datos
  navigateToMisDatos() {
    this.router.navigate(['/mis-datos']);  // Navega a la ruta de Mis Datos
  }

  navigateToCertificaciones() {
    this.router.navigate(['/certificados']);  // Cambia al segmento 'certificaciones'
  }

   // Función para redirigir a Experiencia Laboral
   navigateToExperienciaLaboral() {
    this.router.navigate(['/experiencia-laboral']);
  }
  // Método que se llama cuando cambia el segmento
  segmentChanged(event: any) {
    console.log('Segmento cambiado:', event.detail.value);
    this.selectedSegment = event.detail.value;
  }
  goToExperienciaLaboral() {
    this.selectedSegment = 'experiencia-laboral'; // Cambiar al segmento "experiencia-laboral"
  }

  // Método para navegar a la página de trivia
  goToTrivia() {
    this.router.navigate(['/trivia']);  // Navega a la ruta '/trivia'
  }

  // Función para navegar a la página del mapa
  goToMap() {
    this.navCtrl.navigateForward('/map'); // Usa navCtrl en minúsculas
  }
}
