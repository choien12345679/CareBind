import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  ScrollView 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DPSurvey({ navigation }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [surveyData, setSurveyData] = useState({
    disabilityRegistration: '',
    supportNeeds: '',
    communication: '',
    visualPerception: '',
    cognitiveSkills: '',
    abilityToMove: ''
  });

  // 설문 데이터 구조
  const surveySteps = [
    {
      id: 1,
      title: "Enter disability\nRegistration\nInformation",
      field: "disabilityRegistration",
      options: ["Blind", "Hearing impairment", "Retardation", "Brain lesion disorders"]
    },
    {
      id: 2,
      title: "Support needs",
      field: "supportNeeds",
      options: ["Full help", "Some help", "Contextual help", "none"]
    },
    {
      id: 3,
      title: "Communication",
      field: "communication",
      options: ["hearing impairment", "speech impediment", "Sign language's possible", "none"]
    },
    {
      id: 4,
      title: "Visual\nperception",
      field: "visualPerception",
      options: ["Total Blindness", "Low vision", "Slightly inconvenient", "No problem"]
    },
    {
      id: 5,
      title: "Cognitive skills",
      field: "cognitiveSkills",
      options: ["Normal", "Intellectual disability", "Slow to judge", "Companion required"]
    },
    {
      id: 6,
      title: "Ability to move",
      field: "abilityToMove",
      options: ["Wheelchair", "Requires a walker", "Able to walk independently", "Others"]
    }
  ];

  const currentSurvey = surveySteps[currentStep - 1];

  // 옵션 선택 핸들러
  const handleOptionSelect = (option) => {
    setSurveyData(prev => ({
      ...prev,
      [currentSurvey.field]: option
    }));
  };

  // 다음 단계로 이동
  const handleContinue = () => {
    if (!surveyData[currentSurvey.field]) {
      Alert.alert("Selection Required", "Please select an option to continue");
      return;
    }

    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    } else {
      // 마지막 단계 - 회원가입 완료
      completeSurvey();
    }
  };

  // 설문 완료 및 데이터 저장
  const completeSurvey = async () => {
    try {
      // 기존 사용자 데이터 가져오기
      const existingUserData = await AsyncStorage.getItem('userData');
      const userData = existingUserData ? JSON.parse(existingUserData) : {};

      // 설문 데이터 추가
      const completeUserData = {
        ...userData,
        surveyData: surveyData,
        registrationCompleted: true,
        completedAt: new Date().toISOString()
      };

      // AsyncStorage에 저장
      await AsyncStorage.setItem('completeUserData', JSON.stringify(completeUserData));
      
      Alert.alert(
        "Registration Complete!", 
        "Your registration has been completed successfully!",
        [{ text: "OK", onPress: () => navigation.navigate('Login') }]
      );
      
    } catch (error) {
      console.error('Error completing survey:', error);
      Alert.alert("Error", "Failed to complete registration");
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* 상단 헤더 - 진행 상황과 단계 버튼들 */}
      <View style={styles.header}>
        {/* 진행 상황 표시 */}
        <Text style={styles.progressText}>{currentStep}/6</Text>
        
        {/* 단계 점프 버튼들 */}
        <View style={styles.stepButtons}>
          {[1, 2, 3, 4, 5, 6].map((step) => (
            <TouchableOpacity
              key={step}
              style={[
                styles.stepBtn,
                currentStep === step && styles.activeStepBtn,
                currentStep > step && styles.completedStepBtn
              ]}
              onPress={() => setCurrentStep(step)}
            >
              <Text style={[
                styles.stepBtnText,
                currentStep === step && styles.activeStepBtnText,
                currentStep > step && styles.completedStepBtnText
              ]}>
                {step}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 설문 제목 */}
      <Text style={styles.title}>{currentSurvey.title}</Text>

      {/* 옵션 리스트 */}
      <View style={styles.optionsContainer}>
        {currentSurvey.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionBtn,
              surveyData[currentSurvey.field] === option && styles.selectedOption
            ]}
            onPress={() => handleOptionSelect(option)}
          >
            <View style={styles.optionContent}>
              <View style={[
                styles.checkbox,
                surveyData[currentSurvey.field] === option && styles.checkedBox
              ]}>
                {surveyData[currentSurvey.field] === option && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
              <Text style={[
                styles.optionText,
                surveyData[currentSurvey.field] === option && styles.selectedText
              ]}>
                {option}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* 계속 버튼 */}
      <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
        <LinearGradient
          colors={['#F5A623', '#FFE259']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <Text style={styles.continueBtnText}>
            {currentStep === 6 ? "Sign Up!" : "Continue"}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 40,
  },
  header: {
    width: '100%',
    marginBottom: 30,
  },
  progressText: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  stepButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  stepBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
  },
  activeStepBtn: {
    backgroundColor: '#F5A623',
  },
  completedStepBtn: {
    backgroundColor: '#4CAF50',
  },
  stepBtnText: {
    color: '#666',
    fontWeight: 'bold',
    fontSize: 16,
  },
  activeStepBtnText: {
    color: '#fff',
  },
  completedStepBtnText: {
    color: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F5A623',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 35,
  },
  optionsContainer: {
    width: '100%',
    marginBottom: 40,
  },
  optionBtn: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
    padding: 16,
  },
  selectedOption: {
    borderColor: '#F5A623',
    backgroundColor: '#FFF8E7',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ddd',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkedBox: {
    backgroundColor: '#F5A623',
    borderColor: '#F5A623',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  selectedText: {
    color: '#F5A623',
    fontWeight: 'bold',
  },
  continueBtn: {
    width: '100%',
    borderRadius: 25,
    marginTop: 20,
    overflow: 'hidden',
  },
  gradient: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  continueBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
