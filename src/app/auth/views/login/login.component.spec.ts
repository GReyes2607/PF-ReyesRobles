import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../auth.service';

describe('LoginComponent', () => {
    let component: LoginComponent;
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [MatFormFieldModule, MatInputModule, HttpClientTestingModule]
        })
        component = TestBed.createComponent(LoginComponent).componentInstance
    })

    it('El formulario debe ser invalido si los campos estan vacios', () =>{
        component.emailControl.setValue('');
        component.passwordControl.setValue('');

        expect(component.loginForm.invalid).toBeTrue();
    })

    it('Al llamar login() y el formulario es invalido se debe llamar al metodo markAllAsTouched en el LoginForm', () => {
        component.emailControl.setValue('');
        component.passwordControl.setValue('');
        expect(component.loginForm.invalid).toBeTrue();

        const spyAllTouched = spyOn(component.loginForm, 'markAllAsTouched');

        component.login();
        
        expect(spyAllTouched).toHaveBeenCalled();
    })

    it('Al llamar login() y el formulario es valido de debe llamar a login de authService', () => {
        const authService = TestBed.inject(AuthService);

        component.emailControl.setValue('fake@mail.com');
        component.passwordControl.setValue('123456');

        expect(component.loginForm.valid).toBeTrue();

        const spyOnAuthLogin = spyOn(authService, 'login');

        component.login();

        expect(spyOnAuthLogin).toHaveBeenCalled();
    })
})