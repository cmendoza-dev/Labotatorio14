import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName1: ['', Validators.required],
      lastName2: ['', Validators.required],
      birthDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: any } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
  
    // Si alguna de las contraseñas no está definida, retornar un error
    if (!password || !confirmPassword) {
      return { undefinedPassword: true };
    }
  
    return password === confirmPassword ? null : { mismatch: true };
  }
  

  onClickSubmit() {
    if (this.userForm?.valid) {
      // Realizar acciones cuando el formulario es válido
      console.log(this.userForm.value);
    } else {
      // Realizar acciones cuando el formulario no es válido
      console.log("Formulario no válido");
    }
  }

  ngOnInit() {
    // Puedes realizar inicializaciones aquí si es necesario
  }
}
