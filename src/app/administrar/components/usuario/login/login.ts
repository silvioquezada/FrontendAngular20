import { Component, output } from '@angular/core';
import { LoginService } from '../../../services/login-service';
import Swal from 'sweetalert2';
import { ErrorService } from '../../../../shared/services/error-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  datosenvio = output<any>();

  usuario : string = "";
  password: string = "";

  constructor(private loginservice: LoginService, private error:ErrorService){}

  ingresar(): void
  {
    
    
    this.iniciarLoader();
    const login = {
      'usuario': this.usuario,
      'password': this.password,
    }

    this.loginservice.login(login).subscribe( (data: any) =>
    {
      console.log(data);
      //Swal.close();
      
      if(data.estado==1)
      {
        Swal.fire({
          title: "Información",
          text: "Logeado Correctamente",
          icon: "success"
        });
        localStorage.setItem("logueado", "1");
        localStorage.setItem('token', data.token);
        this.datosenvio.emit(1);  
      }
      else
      {
        Swal.fire({
          title: "Información",
          text: "Contraseña incorrectas",
          icon: "error"
        }); 
      }
      
    }, err => {
            Swal.fire({
                title: "Información",
                text: "Se a originado un error: " + this.error.getClienteStatus(err.status),
                icon: "error"
              });
            
    });

  }

  iniciarLoader()
  {
    Swal.fire({
    title: 'Cargando...',
    html: 'Por favor espere mientras procesamos su solicitud.',
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
          Swal.showLoading(); 
      }
    });
  }

}
