import { useState } from "react";

type Props = {
  changeDifficulty: (difficulty: number) => void;
};

const DifficultySelector = ({ changeDifficulty }: Props) => {
  const [selected, setSelected] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSelected(parseInt(event.target.value));
    changeDifficulty(parseInt(event.target.value));
  };
  return (
    <div className="flex flex-col gap-2 text-white text-sm">
      <label className="font-bold">Difficulty:</label>
      <label className="flex items-center gap-1">
        <input
          type="radio"
          name="difficulty"
          value={1}
          checked={selected === 1}
          onChange={handleChange}
        />
        Easy
      </label>

      <label className="flex items-center gap-1">
        <input
          type="radio"
          name="difficulty"
          value={0}
          checked={selected === 0}
          onChange={handleChange}
        />
        Medium
      </label>

      <label className="flex items-center gap-1">
        <input
          type="radio"
          name="difficulty"
          value={2}
          checked={selected === 2}
          onChange={handleChange}
        />
        Hard
      </label>
      <label className="flex items-center gap-1">
        <input
          type="radio"
          name="difficulty"
          value={3}
          checked={selected === 3}
          onChange={handleChange}
        />
        Very Hard
      </label>
      <label className="flex items-center gap-1">
        <input
          type="radio"
          name="difficulty"
          value={4}
          checked={selected === 4}
          onChange={handleChange}
        />
        Insane
      </label>
    </div>
  );
};

export default DifficultySelector;
