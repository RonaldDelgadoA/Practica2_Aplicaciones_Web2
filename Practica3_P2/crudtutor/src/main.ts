import './style.css'


(async ()=>{

  const response = await fetch('http://localhost:3000/api/tutors')
  const data = await response.json()
  
  let divTable= `<table>`
  divTable += `<tr><th>ID</th><th>Especialidad</th><th>Reputacion</th><th>IDEstudiante</th></tr>`
  data.forEach((tutor: ITutor) => {
    divTable += `<tr><td>${tutor.id}</td><td>${tutor.especialidad}</td><td>${tutor.reputacion}</td><td>${tutor.estudianteId}</td><td><button class="btn btn-delete">Eliminar</button></td><td><button class="btn btn-update">Actualizar</button> </td> </tr>`
  })
  divTable += `</table>`

  document.querySelector<HTMLDivElement>('#app')!.innerHTML = divTable


  const divButton = `<button class="btn btn-primary">Agregar</button>`
  document.querySelector<HTMLDivElement>('#app')!.innerHTML += divButton

  const btnAgregar = document.querySelector<HTMLButtonElement>('.btn-primary')
  btnAgregar?.addEventListener('click', ()=>{
    const divForm = `<form>
    <div class="mb-3">
      <label for="especialidad" class="form-label">Especialidad</label>
      <input type="text" class="form-control" id="especialidad" aria-describedby="especialidad">
    </div>
    <div class="mb-3">
      <label for="reputacion" class="form-label">Reputacion</label>
      <input type="text" class="form-control" id="reputacion" aria-describedby="reputacion">
    </div>
    <div class="mb-3">
      <label for="estudianteId" class="form-label">IDEstudiante</label>
      <input type="text" class="form-control" id="estudianteId" aria-describedby="estudianteId">
    </div>
    <button type='submit'  class="btn btn-save">Save</button>
    <button type='submit'  class="btn btn-cancel">Cancel</button>
    </form>`
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = divForm
    const btnSave = document.querySelector<HTMLButtonElement>('.btn-save')
    btnSave?.addEventListener('click', async (e)=>{
      e.preventDefault()
      const especialidad = document.querySelector<HTMLInputElement>('#especialidad')!.value
      const reputacion = document.querySelector<HTMLInputElement>('#reputacion')!.value
      //const estudianteId = document.querySelector<HTMLInputElement>('#estudianteId')!.value
      const response = await fetch('http://localhost:3000/api/tutors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({especialidad, reputacion, estudianteId:1})
      })
      const data = await response.json()
      console.log(data)
      // reload page
      location.reload()
    })
  })
  document.querySelectorAll<HTMLButtonElement>('.btn-delete').forEach(btn=>{
    btn.addEventListener('click', async ()=>{ 
      const id = btn.parentElement?.parentElement?.firstElementChild?.textContent
      console.log(id)
      await fetch(`http://localhost:3000/api/tutors/${id}`, {
        method: 'DELETE'
      })
      location.reload()

     })
  })
  document.querySelectorAll<HTMLButtonElement>('.btn-update').forEach(btn=>{
    btn.addEventListener('click', async ()=>{ 
      const id = btn.parentElement?.parentElement?.firstElementChild?.textContent
      const response = await fetch(`http://localhost:3000/api/tutors/${id}`)
      const data = await response.json()
      //add button for cancel
      const btnCancel = `<button class="btn btn-cancel">Cancel</button>`
      const divForm = `<form>
      <div class="mb-3">
        <label for="especialidad" class="form-label">Especialidad</label>
        <input type="text" class="form-control" id="especialidad" aria-describedby="especialidad" value="${data.especialidad}">
      </div>
      <div class="mb-3">
        <label for="reputacion" class="form-label">Reputacion</label>
        <input type="text" class="form-control" id="reputacion" aria-describedby="reputacion" value="${data.reputacion}">
      </div>
      <div class="mb-3">
        <label for="estudianteId" class="form-label">IDEstudiante</label>
        <input type="text" class="form-control" id="estudianteId" aria-describedby="estudianteId" value="${data.estudianteId}">
      </div>
      <button type='submit'  class="btn btn-save">Save</button>
      ${btnCancel}
      </form>`
      document.querySelector<HTMLDivElement>('#app')!.innerHTML = divForm
      const btnSave = document.querySelector<HTMLButtonElement>('.btn-save')
      btnSave?.addEventListener('click', async (e)=>{
        e.preventDefault()
        const especialidad = document.querySelector<HTMLInputElement>('#especialidad')!.value
        const reputacion = document.querySelector<HTMLInputElement>('#reputacion')!.value
        //const estudianteId = document.querySelector<HTMLInputElement>('#estudianteId')!.value
        const response = await fetch(`http://localhost:3000/api/tutors/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({especialidad, reputacion, estudianteId:1})
        })
        const data = await response.json()
        console.log(data)
        // reload page
        location.reload()
      })
     })
  })

  
  


})()