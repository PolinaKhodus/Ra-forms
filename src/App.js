import './App.css';
import ColorConverter from './components/converter/ColorConverter';
import TrainingBook from './components/training/TrainingBook';

function App() {
  return (
    <>
      <div className="task-title converter-title">Конвертер цветов</div>      
      <ColorConverter color={'#123123'}/>

      <div className="task-title training-title">Учёт тренировок</div>
      <TrainingBook workouts={[]}/>
    </>    
  );
}

export default App;
