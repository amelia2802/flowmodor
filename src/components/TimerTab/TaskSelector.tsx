import { Select, SelectItem } from '@nextui-org/select';
import useTasksStore from '@/stores/useTasksStore';
import useTimerStore from '@/stores/useTimerStore';
import {Tooltip} from "@nextui-org/react";

export default function TaskSelector() {
  const { isRunning } = useTimerStore((state) => state);
  const { tasks, focusingTask, focusTask } = useTasksStore((state) => state);

  return (
    <Select
      isDisabled={isRunning || tasks.length === 0}
      selectionMode="single"
      selectedKeys={focusingTask ? [focusingTask.toString()] : []}
      label="Select a task"
      size="sm"
      radius="sm"
      classNames={{
        base: 'max-w-xs',
        trigger: 'bg-secondary data-[hover=true]:bg-secondary',
        popoverContent: 'bg-background',
      }}
      onChange={(e) => {
        focusTask(parseInt(e.target.value, 10));
      }}
    >
      {tasks.map((task) => (
        <SelectItem
          key={task.id}
          value={task.name}
          classNames={{
            base: 'data-[focus=true]:!bg-secondary data-[hover=true]:!bg-secondary',
          }}
        >
          <Tooltip content={task.name}>
            <span>{task.name}</span>
          </Tooltip>
        </SelectItem>
      ))}
    </Select>
  );
}
