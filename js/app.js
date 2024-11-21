// Selectores
const pacienteInput = document.querySelector("#paciente");
const propietarioInput = document.querySelector("#propietario");
const emailInput = document.querySelector("#email");
const fechaInput = document.querySelector("#fecha");
const sintomasInput = document.querySelector("#sintomas");

const formulario = document.querySelector("#formulario-cita");

const contenedorCitas = document.querySelector("#citas");

// Eventos
pacienteInput.addEventListener("change", datosCita);
propietarioInput.addEventListener("change", datosCita);
emailInput.addEventListener("change", datosCita);
fechaInput.addEventListener("change", datosCita);
sintomasInput.addEventListener("change", datosCita);

formulario.addEventListener("submit", submitCita);

// Objeto de la cita
const citaObj = {
  paciente: "",
  propietario: "",
  email: "",
  fecha: "",
  sintomas: "",
};

// Clase Notificación
class Notificacion {
  constructor({ texto, tipo }) {
    this.texto = texto;
    this.tipo = tipo;
  }

  mostrar() {
    // Crear notificación
    const alerta = document.createElement("DIV");
    alerta.classList.add(
      "text-center",
      "w-full",
      "p-3",
      "text-white",
      "my-5",
      "alert",
      "uppercase",
      "font-bold",
      "text-sm"
    );

    // Eliminar alerta previa
    const alertaPrevia = document.querySelector(".alert");
    if (alertaPrevia) alertaPrevia.remove();

    // Establecer clase de color según tipo
    if (this.tipo === "error") {
      alerta.classList.add("bg-red-500");
    } else {
      alerta.classList.add("bg-green-500");
    }

    // Mensaje de la alerta
    alerta.textContent = this.texto;

    // Insertar en el DOM
    formulario.parentElement.insertBefore(alerta, formulario);

    // Eliminar alerta después de 5 segundos
    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

class AdminCitas {
  constructor() {
    this.citas = [];
  }

  agregar(cita) {
    this.citas.push(cita);
    this.mostrar();
  }

  mostrar() {
    // Limpiar el contenedor de citas
    while (contenedorCitas.firstChild) {
      contenedorCitas.removeChild(contenedorCitas.firstChild);
    }

    // Mostrar todas las citas
    this.citas.forEach((cita, index) => {
      const divCita = document.createElement("div");
      divCita.classList.add(
        "mx-5",
        "my-10",
        "bg-white",
        "shadow-md",
        "px-5",
        "py-10",
        "rounded-xl",
        "p-3"
      );

      const paciente = document.createElement("p");
      paciente.classList.add(
        "font-normal",
        "mb-3",
        "text-gray-700",
        "normal-case"
      );
      paciente.innerHTML = `<span class="font-bold uppercase">Paciente: </span> ${cita.paciente}`;

      const propietario = document.createElement("p");
      propietario.classList.add(
        "font-normal",
        "mb-3",
        "text-gray-700",
        "normal-case"
      );
      propietario.innerHTML = `<span class="font-bold uppercase">Propietario: </span> ${cita.propietario}`;

      const email = document.createElement("p");
      email.classList.add(
        "font-normal",
        "mb-3",
        "text-gray-700",
        "normal-case"
      );
      email.innerHTML = `<span class="font-bold uppercase">E-mail: </span> ${cita.email}`;

      const fecha = document.createElement("p");
      fecha.classList.add(
        "font-normal",
        "mb-3",
        "text-gray-700",
        "normal-case"
      );
      fecha.innerHTML = `<span class="font-bold uppercase">Fecha: </span> ${cita.fecha}`;

      const sintomas = document.createElement("p");
      sintomas.classList.add(
        "font-normal",
        "mb-3",
        "text-gray-700",
        "normal-case"
      );
      sintomas.innerHTML = `<span class="font-bold uppercase">Síntomas: </span> ${cita.sintomas}`;

      // Botones de Editar y Eliminar
      const btnEditar = document.createElement("button");
      btnEditar.classList.add(
        "py-2",
        "px-10",
        "bg-indigo-600",
        "hover:bg-indigo-700",
        "text-white",
        "font-bold",
        "uppercase",
        "rounded-lg",
        "flex",
        "items-center",
        "gap-2"
      );
      btnEditar.innerHTML =
        'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';

      const btnEliminar = document.createElement("button");
      btnEliminar.classList.add(
        "py-2",
        "px-10",
        "bg-red-600",
        "hover:bg-red-700",
        "text-white",
        "font-bold",
        "uppercase",
        "rounded-lg",
        "flex",
        "items-center",
        "gap-2"
      );
      btnEliminar.innerHTML =
        'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';

      // Agregar eventos para Editar y Eliminar
      btnEditar.addEventListener("click", () => editarCita(index));
      btnEliminar.addEventListener("click", () => eliminarCita(index));

      const contenedorBotones = document.createElement("DIV");
      contenedorBotones.classList.add("flex", "justify-between", "mt-10");
      contenedorBotones.appendChild(btnEditar);
      contenedorBotones.appendChild(btnEliminar);

      // Agregar los elementos al DOM
      divCita.appendChild(paciente);
      divCita.appendChild(propietario);
      divCita.appendChild(email);
      divCita.appendChild(fecha);
      divCita.appendChild(sintomas);
      divCita.appendChild(contenedorBotones);
      contenedorCitas.appendChild(divCita);
    });
  }

  eliminar(index) {
    this.citas.splice(index, 1); // Eliminar la cita
    this.mostrar(); // Mostrar las citas actualizadas
  }

  editar(index, nuevaCita) {
    this.citas[index] = nuevaCita; // Actualizar la cita
    this.mostrar(); // Mostrar las citas actualizadas
  }
}

// Función para recoger los datos de la cita
function datosCita(evt) {
  citaObj[evt.target.name] = evt.target.value;
}

const citas = new AdminCitas();

// Función para enviar el formulario
function submitCita(evt) {
  evt.preventDefault();

  // Verificar si todos los campos están completos
  if (Object.values(citaObj).some((valor) => valor.trim() === "")) {
    const notificacion = new Notificacion({
      texto: "Todos los campos son obligatorios",
      tipo: "error",
    });
    notificacion.mostrar();
    return;
  }

  // Agregar la cita
  citas.agregar(citaObj);

  // Notificación de éxito
  new Notificacion({
    texto: "Paciente registrado",
    tipo: "exito",
  });

  // Reiniciar el objeto citaObj
  Object.keys(citaObj).forEach((key) => {
    citaObj[key] = "";
  });

  // Limpiar los campos del formulario
  formulario.reset();
}

// Función para editar una cita
function editarCita(index) {
  const cita = citas.citas[index]; // Obtener la cita seleccionada

  // Rellenar los campos del formulario con la cita seleccionada
  pacienteInput.value = cita.paciente;
  propietarioInput.value = cita.propietario;
  emailInput.value = cita.email;
  fechaInput.value = cita.fecha;
  sintomasInput.value = cita.sintomas;

  // Cambiar el evento del formulario para editar la cita
  formulario.removeEventListener("submit", submitCita);
  formulario.addEventListener("submit", function editar(evt) {
    evt.preventDefault();

    // Actualizar la cita con los nuevos datos
    const citaActualizada = {
      paciente: pacienteInput.value,
      propietario: propietarioInput.value,
      email: emailInput.value,
      fecha: fechaInput.value,
      sintomas: sintomasInput.value,
    };

    // Actualizar la cita en el arreglo
    citas.editar(index, citaActualizada);

    // Mostrar notificación
    new Notificacion({
      texto: "Cita actualizada",
      tipo: "exito",
    });

    // Restablecer el formulario
    formulario.reset();
    formulario.removeEventListener("submit", editar);
    formulario.addEventListener("submit", submitCita);
  });
}

// Función para eliminar una cita
function eliminarCita(index) {
  const confirmacion = confirm("¿Seguro que deseas eliminar esta cita?");
  if (confirmacion) {
    citas.eliminar(index);
    new Notificacion({
      texto: "Cita eliminada",
      tipo: "exito",
    });
  }
}
