import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'practice-reactive-forms';

  personalForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  get NombreNoValido() {
    return (
      this.personalForm.get('nombre').invalid &&
      this.personalForm.get('nombre').touched
    );
  }

  get ApellidoNoValido() {
    return (
      this.personalForm.get('apellido').invalid &&
      this.personalForm.get('apellido').touched
    );
  }

  get CorreoNoValido() {
    return (
      this.personalForm.get('correo').valid &&
      this.personalForm.get('correo').touched
    );
  }

  createForm() {
    this.personalForm = this.fb.group({
      //VALIDACIONES SINCRONAS
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required],
      }),
    });
  }
  guardarUsuario() {
    console.log(this.personalForm.value);
    if (this.personalForm.invalid) {
      return Object.values(this.personalForm.controls).map((control) =>
        control.markAsTouched()
      );
    }
  }
}
