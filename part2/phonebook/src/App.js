import React, { useState, useEffect } from 'react';
import personsService from './services/persons';

const NotificationErr = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className="error">
      {message}
    </div>
  );
};

const NotificationSucc = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className="success">
      {message}
    </div>
  );
};

const FilterFields = (props) => {
  const search = (event) => {
    event.preventDefault();
  };
  const handleSearchChange = (event) => {
    props.setNewSearch(event.target.value);
  };

  return (
    <>
      <form onSubmit={search}>
        <div>
          filter:
          {' '}
          <input
            value={props.newSearch}
            onChange={handleSearchChange}
          />
        </div>
      </form>
    </>
  );
};

const AddNew = (props) => {
  const addName = (event) => {
    event.preventDefault();

    // const maxId = props.persons.reduce(
    //   (max, person) => (person.id > max ? person.id : max),
    //   0)

    const entry = {
      name: props.newName,
      number: props.newNumber,
      // id: maxId + 1,
    };

    const map1 = props.persons.map((x) => x.name);

    if (map1.includes(entry.name)) {
      const result = window.confirm(`${entry.name} is already in phonebook. Update its number?`);

      if (result) {
        const personObj = props.persons.filter((x) => x.name === entry.name);
        personsService
          .update(personObj[0].id, entry)
          .then((returnedPerson) => {
            personsService.getAll()
              .then((initialPersons) => {
                props.setPersons(initialPersons);
              });
            props.setNewName('');
            props.setNewNumber('');
            props.setSuccessMessage(`${personObj[0].name} successfully updated.`);
            setTimeout(() => {
              props.setSuccessMessage(null);
            }, 5000);
          })
          .catch((error) => {
            props.setNewName('');
            props.setNewNumber('');
            props.setErrorMessage(error.response.data.error);
            setTimeout(() => {
              props.setErrorMessage(null);
            }, 5000);
          });
      } else {
        props.setNewName('');
        props.setNewNumber('');
      }
    } else {
      personsService
        .create(entry)
        .then((returnedPerson) => {
          props.setPersons(props.persons.concat(returnedPerson));
          props.setNewName('');
          props.setNewNumber('');
          props.setSuccessMessage(`${entry.name} successfully added.`);
          setTimeout(() => {
            props.setSuccessMessage(null);
          }, 5000);
        })
        .catch((error) => {
          props.setErrorMessage(error.response.data.error);
          setTimeout(() => {
            props.setErrorMessage(null);
          }, 5000);
        });
    }
  };

  const handleNameChange = (event) => {
    props.setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    props.setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Add new</h2>
      <form onSubmit={addName}>
        <div>
          name:
          {' '}
          <input
            value={props.newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number:
          {' '}
          <input
            value={props.newNumber}
            onChange={handleNumberChange}
          />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

const Numbers = (props) => {
  const re = new RegExp(`${props.newSearch}(.+)?`, 'i');
  const match = props.persons.filter((e) => e.name.search(re) !== -1);

  const personDelete = (e) => {
    const personObj = props.persons.filter((x) => x.id === e.target.value);
    const result = window.confirm(`Delete entry for ${personObj[0].name}?`);

    if (result) {
      personsService
        .remove(e.target.value)
        .then(() => {
          personsService.getAll()
            .then((initialPersons) => {
              props.setPersons(initialPersons);
            });
          props.setSuccessMessage(`${personObj[0].name} successfully deleted.`);
          setTimeout(() => {
            props.setSuccessMessage(null);
          }, 5000);
        })
        .catch((error) => {
          props.setErrorMessage(`${personObj[0].name} was already removed from server.`);
          personsService.getAll()
            .then((initialPersons) => {
              props.setPersons(initialPersons);
            });
          setTimeout(() => {
            props.setErrorMessage(null);
          }, 5000);
        });
    }
  };

  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {match.map((person) => (
          <li key={person.id}>
            {person.name}
            {' '}
            {person.number ? person.number : 'no number'}
            <button
              value={person.id}
              onClick={personDelete}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setNewSearch] = useState('');
  const [newMatch, setNewMatch] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personsService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>

      <NotificationErr message={errorMessage} />
      <NotificationSucc message={successMessage} />

      <FilterFields
        persons={persons}
        newSearch={newSearch}
        setNewSearch={setNewSearch}
        newMatch={newMatch}
        setNewMatch={setNewMatch}
      />

      <AddNew
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        successMessage={successMessage}
        setSuccessMessage={setSuccessMessage}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />

      <Numbers
        persons={persons}
        setPersons={setPersons}
        newSearch={newSearch}
        successMessage={successMessage}
        setSuccessMessage={setSuccessMessage}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />

    </div>
  );
};

export default App;
