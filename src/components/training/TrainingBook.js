import { useState } from 'react';
import WorkoutForm from './WorkoutForm';
import WorkoutsList from './WorkoutsList';

export default function TrainingBook() {

  const [form, setForm] = useState({
    date: '2020-10-10',
    path: '10.5',
  });

  const [list, setList] = useState([]);

  const onChange = (e) => {
    e.target.value = e.target.value.replace(',', '.');
    setForm((prev) => ({...prev, [e.target.name]: e.target.value}));
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (!form.date || !form.path) return;

    if (/[^0-9.]/.test(form.path)) {
      setForm((prev) => ({...prev, path: ''}));
      return;
    }

    setList((prev) => {
      let copy = [...prev.map((workout) => ({...workout}))];

      if (!prev.find((item) => item.date === form.date)) {
        copy.push(form);
      } else {
        const itemToChange = copy.find((item) => item.date === form.date);

        itemToChange.path = '' + (+itemToChange.path + +form.path);
      }

      return copy.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });

    setForm((prev) => ({...prev, date: '', path: ''}));
  }

  const onDelWorkout = (item) => {
    setList((prev) => [...prev].filter((workout) => workout !== item));
  }

  const onEditWorkout = (item) => {
    setForm((prev) => ({...prev, date: item.date, path: item.path}));
  }

  return (
    <div className="training-box">
      <WorkoutForm form={form}
        onFormChange={onChange}
        onFormSubmit={onSubmit}/>

      <WorkoutsList workouts={list} 
        onDelClick={onDelWorkout}
        onEditClick={onEditWorkout}/>
    </div>
  );
}
