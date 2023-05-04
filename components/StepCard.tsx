import { Text, View } from "component";
import { CircleRing } from "./Circle";
import { getDayName } from "../utils/dateUtil";

export interface IStepCard {
  day: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  step: number;
  date: string;
  goal?: number;
}

export function StepCard(props: IStepCard) {
  
  const { day, step, date, goal=0 } = props;

  const statusText = !!goal && (step < goal ? `Remaining ${goal-step} steps!` : 'Completed');

  const stepPercentage = step / goal;
  const stepPercent = stepPercentage >= 1 ? 100 : stepPercentage * 100;
  const isInifity = stepPercentage === Infinity;

  const progress = isInifity ? 0 : stepPercent;

  return (
    <View
      style={{
        height: 120,
        width: "100%",
        borderRadius: 20,
        backgroundColor: "lightgray",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: 'row',
        padding: 10,
      }}
    >
      <Text style={{color: 'black', top: 10, position: 'absolute',width: '100%', fontWeight: 'bold', textAlign: 'right'}}>{getDayName(day)} {date}</Text>
      <View style={{alignItems: 'center', backgroundColor: 'transparent'}}>
        <CircleRing
          radius={40}
          strokeWidth={3}
          strokeColor={"#F0F0F0"}
          progressColor={"purple"}
          progress={progress}
        >
          <Text style={{ fontWeight: "bold", color: "black", fontSize: 20 }}>{step}</Text>
          <Text style={{ color: "black", fontSize: 15 }}>Steps</Text>
        </CircleRing>
      </View>
      
      {statusText &&
        <View style={{flex: 1, backgroundColor: 'transparent', paddingHorizontal: 10}}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15}}>Status: </Text>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>{statusText}</Text>
        </View>
      }
      <Text style={{color: 'black', bottom: 10, position: 'absolute',width: '100%', fontWeight: 'bold', textAlign: 'right'}}>{goal? `Goal: ${goal} steps` : 'No goal is set!'}</Text>
    </View>
  );
}
