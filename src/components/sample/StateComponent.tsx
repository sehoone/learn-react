import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { increment, decrement, incrementByAmount } from '@/store/sample/counterSlice';

const StateComponent = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>
    </div>
  );
};

export default StateComponent;