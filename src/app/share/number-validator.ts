import { AbstractControl } from "@angular/forms";

export function NumberValidator(control: AbstractControl) {
    let val = control.value;
    if (val === null || val === '') return null;
    const isNumber = /^[0-9]+(\.?[0-9]+)?$/.test(val)
    return isNumber ? null : { invalidNumber: true }
}