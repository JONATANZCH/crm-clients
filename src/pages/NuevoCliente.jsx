import { useNavigate, Form, useActionData, redirect } from "react-router-dom";
import Formulario from "../components/Formulario";
import Error from "../components/Error";
import { agregarCliente } from "../data/clientes";

export async function action({ request }) {
    const formData = await request.formData();
    const datos = Object.fromEntries(formData);
    const email = formData.get("email");

    // Validación
    const errores = [];
    if (Object.values(datos).includes("")) {
        errores.push("Todos los campos son obligatorios");
    }

    let regex = new RegExp(
        "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
    );
    if (!regex.test(email)) {
        errores.push("El Email no es válido");
    }

    // Retornar datos si hay errores
    if (Object.keys(errores).length) {
        return errores;
    }
    await agregarCliente(datos);
    return redirect("/");
}

function NuevoCliente() {
    const errores = useActionData();
    const navigate = useNavigate();

    return (
    <>
        <h1 className="font-black text-4xl bg-slate-100">Nuevo Cliente</h1>
        <p className="mt-3">Registrar un nuevo cliente</p>

        <div className="flex justify-end">
            <button
            className="group relative inline-block focus:outline-none focus:ring"
            onClick={() => navigate(-1)}
            >
                <span class="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-amber-800 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>
                <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                    Volver
                </span>
            </button>
        </div>

        <div className="bg-slate-100 mt-20 mb-0 space-y-4 rounded-lg p-8 shadow-2xl md:w-3/4 mx-auto px-5 py-10">
            {errores?.length &&
            errores.map((error, i) => <Error key={i}>{error}</Error>)}

            <Form method="post" noValidate>
                <Formulario />

                <input
                    type="submit"
                    className='transition hover:scale-95 mt-5 w-full bg-slate-900 p-2 uppercase font-medium text-white text-lg cursor-pointer rounded-lg'
                    value="Registrar cliente"
                />
            </Form>
        </div>
    </>
    );
}

export default NuevoCliente;
