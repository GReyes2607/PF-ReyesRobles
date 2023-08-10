import { TestBed } from "@angular/core/testing";
import { UserFormDialogComponent } from "./user-form-dialog.component"
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UserService } from "../../../models/user.service";

describe('UserFormDialogComponent', () => {
    let component: UserFormDialogComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({

            declarations: [UserFormDialogComponent],
            imports: [MatFormFieldModule, MatInputModule, HttpClientTestingModule],
            providers: [
                { 
                    provide: MatDialogRef, 
                    useValue: {} 
                },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {}
                }
              ]
        })
        component = TestBed.createComponent(UserFormDialogComponent).componentInstance
    })

    it('El formulario debe ser invalido si los campos estan vacios', () =>{
        component.emailControl.setValue('');
        component.passwordControl.setValue('');
        component.nameControl.setValue('');
        component.surNameControl.setValue('');

        expect(component.userForm.invalid).toBeTrue();
    })

    it('Cuando al guardar los datos y el formulario es invalido se debe de llamar a markAllAsTouched en el UserFormDialog', () => {
        component.emailControl.setValue('');
        component.passwordControl.setValue('');
        component.nameControl.setValue('');
        component.surNameControl.setValue('');

        expect(component.userForm.invalid).toBeTrue();

        const spyAllTouched = spyOn(component.userForm, 'markAllAsTouched');

        component.onSubmit();
        
        expect(spyAllTouched).toHaveBeenCalled();
    })

})