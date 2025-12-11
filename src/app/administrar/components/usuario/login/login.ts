import { Component } from '@angular/core';
import { LoginService } from '../../../services/login-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {


  constructor(private loginservice: LoginService){}

  guardar(): void
  {
    this.iniciarLoader();
    const login = {
      'usuario': 'admin',
      'password': '12345',
    }

    this.loginservice.login(login).subscribe( (data: any) =>
    {
      console.log(data);
      Swal.close();
      if(data.token)
      {
        Swal.fire({
          title: "Información",
          text: "Logeado Correctamente",
          icon: "success"
        });

        localStorage.setItem('token', data.token);
      }
      else
      {
        Swal.fire({
          title: "Información",
          text: "Se a originado un error",
          icon: "error"
        }); 
      }
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
