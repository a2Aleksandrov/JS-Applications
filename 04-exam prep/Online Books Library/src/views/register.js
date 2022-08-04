import { html } from '../lib.js';
import { register } from '../users.js';

const registerTemplate = (onSubmit) => html`
<section id="register-page" class="register">
    <form id="register-form" action="" method="" @submit=${onSubmit}>
        <fieldset>
            <legend>Register Form</legend>
            <p class="field">
                <label for="email">Email</label>
                <span class="input">
                    <input type="text" name="email" id="email" placeholder="Email">
                </span>
            </p>
            <p class="field">
                <label for="password">Password</label>
                <span class="input">
                    <input type="password" name="password" id="password" placeholder="Password">
                </span>
            </p>
            <p class="field">
                <label for="repeat-pass">Repeat Password</label>
                <span class="input">
                    <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                </span>
            </p>
            <input class="button submit" type="submit" value="Register">
        </fieldset>
    </form>
</section>`;


export function registerPage(ctx) {

    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const repass = formData.get('confirm-pass');

        if (email == '' || password == '') {
            return alert('All fields are required!');
        }
        if (password != repass) {
            return alert('Passwords are not the same!');
        }
        await register(email, password);
        ctx.updateNav();
        ctx.page.redirect('/catalog');
    }
}