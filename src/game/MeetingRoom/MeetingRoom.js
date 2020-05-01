import React from 'react';
import TasksContainer from './TasksContainer.js'

function MeetingRoom(props) {


  function pageSelector() {
    if(props.player.task.isStarted) {
      if(props.player.task.isFinished)
        return <div><button onClick={() => props.calculateTask()}>Calculate Task</button></div>
      else
        return <div>{props.time}</div>
    } else {
      if (!props.player.task.isTasksIdSelected)
        selectTasksId();
      return <TasksContainer startTask={props.startTask.bind(this)}
                            tasksList={props.tasksList}
                            selectedTasksList={props.player.task.selectedTasksList}
                            gold={props.player.task.gold}
                            exp={props.player.task.exp}/>
    }
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function selectTasksId() {
    let newPlayer = props.player;

    let id1 = getRandomInt(0, props.tasksList.length);
    let id2 = getRandomInt(0, props.tasksList.length);
    let id3 = getRandomInt(0, props.tasksList.length);
    while(id2 === id1) {
      id2 = getRandomInt(0, props.tasksList.length);
    }
    while(id3 === id1 || id3 === id2) {
      id3 = getRandomInt(0, props.tasksList.length);
    }
    let time = [props.tasksList[id1].time, props.tasksList[id2].time, props.tasksList[id3].time];
    let newGold = [props.tasksList[id1].gold, props.tasksList[id2].gold, props.tasksList[id3].gold];
    let newExp = [props.tasksList[id1].exp, props.tasksList[id2].exp, props.tasksList[id3].exp];
    let random = 0;
    let lvl = newPlayer.lvl + 1;
    let idList = [0, 1, 2];
    for(var i of idList) {
      random = getRandomInt(1, time[i]-1);
      newGold[i] = newGold[i] * lvl * random;
      newExp[i] = newExp[i] * lvl * (time[i] - random);
    }
    newPlayer.task.isTasksIdSelected = true;
    newPlayer.task.selectedTasksList = [id1, id2, id3];
    newPlayer.task.gold = newGold;
    newPlayer.task.exp = newExp;
    props.updatePlayer(newPlayer)
  }

  return (
    <div>
      {pageSelector()}
    </div>
  )
}

export default MeetingRoom;
