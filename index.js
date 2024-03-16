const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-FTB-ET-WEB-WE/events`;

const state = {
  events: [],
}

const partyList = document.getElementById("partyList");
const partyForm = document.getElementById("partyForm");
const button = partyForm.submit;

//Read-GET
const retrieveAllEvents = async () => {
  try{
    const response = await fetch(API_URL);
    const result = await response.json();
    state.events = result.data;
    console.log(state);
  } catch(err){
    console.log(err)
  }
  
};

//Create-POST
const createEvent = async () => {
  try{
    const newParty = {
      name: partyForm.name.value,
      description: partyForm.description.value,
      date: '2023-08-20T23:40:08.000Z',
      location: partyForm.location.value
    };
    console.log(JSON.stringify(newParty))
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(newParty)
    });
    const result = await response.json();
    state.events.push(result.data);
    console.log(state);
  } catch(err){
      console.log(err)
  }
};
button.addEventListener("click", createEvent)

//Update-PUT
const updateEvent = async (updatedEvent) => {
  try{
    const response = await fetch(`${API_URL}/${updatedEvent.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: updatedEvent
    });
    const result = await response.json();
    state.events = result.data;
    console.log(state);
  } catch(err){
      console.log(err)
  }
}

//Delete-DELETE
const deletedEvent = async (deletedId) => {
  try{
    response = await fetch(`${API_URL}/${deletedEvent}`)
  } catch(err){
    console.log(err)
  }
}

function displayEvents() {
  const eventElements = state.events.map(event => {
  const eventDiv = document.createElement("div");
  
  const eventName = document.createElement("p")
  eventName.textContent = event.name

  const eventDescription = document.createElement("p")
  eventDescription.textContent = event.description

  const eventDate = document.createElement("p")
  eventDate.textContent = event.date

  const eventLocation = document.createElement("p")
  eventLocation.textContent = event.location

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete"
  deleteButton.addEventListener("click", async() => {
    try{
        const response = await fetch(`${API_URL}/${event.id}`, {
            method: "DELETE"
        });
    } catch(err) {
        console.error(err);
    }
  });

  eventDiv.append(eventName, eventDescription, eventDate, eventLocation, deleteButton)
  return eventDiv
  })
  partyList.replaceChildren(...eventElements)
}


const init = async () => {
  await retrieveAllEvents();
  displayEvents();
}
init()