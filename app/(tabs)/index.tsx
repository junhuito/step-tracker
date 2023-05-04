import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import { Spacer, Text, View } from '../../components/Themed';
import { CircleRing } from '../../components/Circle';
import { StepCard } from '../../components/StepCard';
import { useEffect, useState } from 'react';
import { PopupModal } from '../../components/PopupModal';
import InputSpinner from 'react-native-input-spinner';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux';
import { fetchStepAction, saveStepGoalAction } from '../redux/actions';
import { IStepData, IStepError, IStepGoal } from '../interfaces/stepInterface';

interface ITrackerScreen {
  data: IStepData;
  goal: IStepGoal;
  error: IStepError;
  fetchStepToday: Function;
  saveStepGoal: Function;
};

function TrackerScreen(props: ITrackerScreen) {

  const { error, fetchStepToday, data, goal, saveStepGoal } = props;

  const [isModalHidden, setIsModalHidden] = useState(false);
  const [newGoal, setGoal] = useState(goal);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchStepToday();
  },[]);

  useEffect(() => {
    saveStepGoal(newGoal);
  }, [newGoal]);

  useEffect(() => {

    if (!goal) {
      setProgress(0);
    }

    if (goal && data.stepToday >= goal) {
      setProgress(100);
    }
    
    if (goal && data.stepToday < goal){
      const newProgress = (data.stepToday / goal) * 100;
      setProgress(newProgress);
    }
  }, [goal, data])

  return (
    <>
    {/* GOAL INPUT MODAL */}
    <PopupModal
      visible={isModalHidden}
      animationType={"slide"}
      setIsVisible={setIsModalHidden}
    >
      {/* Modal content goes here */}
      <KeyboardAwareScrollView>
        <View style={{height: 400, padding: 30}}>
          <Text style={{fontSize: 25,}}>Set the goal</Text>
          <Spacer />
          <InputSpinner
            min={1}
            step={1}
            value={goal}
            fontSize={30}
            onChange={(v:number)=>setGoal(v)}
          />
        </View>
      </KeyboardAwareScrollView>
    </PopupModal>
    {/* GOAL INPUT MODAL */}

    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.dateLabel}>Today</Text>
        <Spacer small/>
        <CircleRing
          style={styles.circle}
          radius={80}
          strokeWidth={10}
          strokeColor={'lightgray'}
          progressColor={'purple'}
          progress={progress}
        >
          <Text style={{fontWeight: 'bold', fontSize: 30}}>{data.stepToday}</Text>
          <Text style={{color: "lightgray", fontWeight: 'bold' }}>Steps</Text>
        </CircleRing>

        <Spacer small/>
        {!!goal && (
          <>
            <Text style={{alignSelf: 'center'}}>Target: {goal} steps!</Text>
            <Spacer/>
            <TouchableOpacity onPress={()=> setIsModalHidden((hidden)=> !hidden)}>
              <Text style={[styles.centerText, styles.goalText]}>Click me to set the goal again!</Text>
            </TouchableOpacity>
          </>
        )}
        {!goal &&
          <TouchableOpacity onPress={()=> setIsModalHidden((hidden)=> !hidden)}>
            <Text style={[styles.centerText, styles.goalText]}>No a goal yet? Click me to set the goal!</Text>
          </TouchableOpacity>
        }
        <View style={styles.separator}></View>
        <Text style={styles.centerText}>Step History Past 7 Days</Text>
        <Spacer small/>
        <View style={{gap: 5}}>
        {
          data.stepHistory.map(({day, step, date, goal}, index) => 
            <StepCard
              key={index}
              day={day}
              step={step}
              date={date}
              goal={goal}
            />
          )
        }
        </View>
        
      </View>
    </ScrollView>
    </>
  );
}

const mapStateToProps = (state: any) => ({
  data: state.stepReducer.data,
  goal: state.stepReducer.goal,
  error: state.stepReducer.error.message,
});

const mapStateToDispatch = (dispatch: any) => ({
  fetchStepToday: () => dispatch(fetchStepAction()),
  saveStepGoal: (step:number) => dispatch(saveStepGoalAction(step)),
});

export default connect(mapStateToProps, mapStateToDispatch)(TrackerScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  circle: {
    alignSelf: 'center',
  },
  dateLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    backgroundColor: 'grey',
    marginVertical: 30,
    height: 1,
    width: '100%',
  },
  goalText: {
    textDecorationLine: 'underline',
  },
  centerText: {
    alignSelf: 'center',
  }
});
