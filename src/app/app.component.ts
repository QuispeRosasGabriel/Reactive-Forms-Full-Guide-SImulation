import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

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

  get amigos() {
    return this.personalForm.get('amigos') as FormArray;
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
      this.personalForm.get('correo').invalid &&
      this.personalForm.get('correo').touched
    );
  }

  get DistritoNoValido() {
    return (
      this.personalForm.get('direccion.distrito').invalid &&
      this.personalForm.get('direccion.distrito').touched
    );
  }

  get CiudadNoValida() {
    return (
      this.personalForm.get('direccion.ciudad').invalid &&
      this.personalForm.get('direccion.ciudad').touched
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
      amigos: this.fb.array([]),
      familiar: this.fb.array([]),
    });
  }

  setInitialData() {
    //COLCOAR VALORES AL FORM
    this.personalForm.setValue({
      nombre: 'Juan',
      apellido: 'Sanchez',
      correo: 'test@gmail.com',
      direccion: {
        distrito: 'LIMA',
        ciudad: 'LIMA',
      },
    });
  }

  createNewForm() {
    this.fb.group({
      nombre: [''],
      edad: [''],
    });
  }

  addOne() {
    const forma = this.personalForm.get('familiar') as FormArray;
    // forma.push(this.createNewForm());
  }

  deleteData() {
    this.personalForm.reset();
  }

  addFriend() {
    let form = this.personalForm.get('amigos') as FormArray;
    form.push(this.fb.control(['Nuevo']));
  }
  deleteFriend(i: number) {
    let form = this.personalForm.get('amigos') as FormArray;
    form.removeAt(i);
  }

  guardarUsuario() {
    console.log(this.personalForm.value);
    if (this.personalForm.invalid) {
      return Object.values(this.personalForm.controls).map((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).map((control) => {
            control.markAsTouched();
          });
        }
        control.markAsTouched();
      });
    }
    this.personalForm.reset();
  }
}
