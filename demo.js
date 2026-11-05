(() => {
const $=id=>document.getElementById(id), form=$('booking-form');
const date=new Date();date.setMinutes(date.getMinutes()-date.getTimezoneOffset());
if($('day')){$('day').min=date.toISOString().slice(0,10);const max=new Date(date);max.setDate(max.getDate()+60);$('day').max=max.toISOString().slice(0,10);}
function feedback(target,text){let result=target.querySelector('.demo-result');if(!result){result=document.createElement('div');result.className='demo-result';result.setAttribute('role','status');result.tabIndex=-1;target.append(result);}result.textContent=text;result.focus();}
if(form){let counter=0;function slots(){const slot=$('slot');slot.replaceChildren(new Option('Selecciona servicio y fecha',''));slot.disabled=true;if(!$('service').value||!$('day').value)return;if(new Date($('day').value+'T12:00:00').getDay()===0){slot.replaceChildren(new Option('Domingo cerrado',''));return;}slot.replaceChildren(new Option('Selecciona una hora',''));for(const t of ['09:00','09:30','10:00','11:00','14:00','14:30','16:00'])slot.add(new Option(t,t));slot.disabled=false;}
$('service').addEventListener('change',slots);$('day').addEventListener('change',slots);
form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;counter++;feedback(form,`Simulación #${counter}: cita para ${$('day').value} a las ${$('slot').value}. No se ha guardado ni enviado información. El sistema completo sí guarda las citas en SQLite.`);});}
for(const other of document.querySelectorAll('form'))if(other!==form)other.addEventListener('submit',event=>{event.preventDefault();feedback(other,'Esta acción es una simulación. En el producto instalado puedes guardar cambios y gestionar citas; esta demo no modifica ni guarda datos.');});
})();