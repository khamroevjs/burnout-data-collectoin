package com.burnoutstopper.copingservice.service.calculate

import com.burnoutstopper.burnoutservice.dto.gender.Gender
import com.burnoutstopper.copingservice.dto.answers.AnswersRequestDTO
import com.burnoutstopper.copingservice.model.Result
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.io.ResourceLoader
import org.springframework.stereotype.Service
import java.io.BufferedReader
import java.io.InputStream
import java.io.InputStreamReader
import java.time.OffsetDateTime
import java.time.ZoneOffset

@Service
class CalculateServiceImpl @Autowired constructor(resourceLoader: ResourceLoader) : CalculateService {

    /*
    Confrontation -             0-18, first ind = 0
    Distancing -                0-18, first ind = 19
    Self-control -              0-21, first ind = 38
    Seeking social support -    0-18, first ind = 60
    Taking responsibility -     0-12, first ind = 79
    Escape-avoidance -          0-24, first ind = 92
    Problem solving planning -  0-18, first ind = 117
    Positive reassessment -     0-21, first ind = 136
    */
    private val tPointsTranslation = IntArray(1264)

    init {
        val resource = resourceLoader.getResource("classpath:t_points_translation.csv")
        val inputStream: InputStream = resource.inputStream
        val reader = BufferedReader(InputStreamReader(inputStream))
        var line: String?
        reader.readLine() // skipping the first line
        for (i in tPointsTranslation.indices) {
            line = reader.readLine()
            tPointsTranslation[i] = line.split(";")[4].toInt()
        }
        reader.close()
    }

    override fun calculateResult(answersRequestDTO: AnswersRequestDTO, respondentId: Int): Result {
        val answers = answersRequestDTO.answers
        val gender = Gender.MALE
        val age = 30

        val confrontation = answers.sliceSum(2, 3, 13, 21, 26, 37)
        val distancing = answers.sliceSum(8, 9, 11, 16, 32, 35)
        val selfControl = answers.sliceSum(6, 10, 27, 34, 44, 49, 50)
        val seekingSocialSupport = answers.sliceSum(4, 14, 17, 24, 33, 36)
        val takingResponsibility = answers.sliceSum(5, 19, 22, 42)
        val escapeAvoidance = answers.sliceSum(7, 12, 25, 31, 38, 41, 46, 47)
        val problemSolvingPlanning = answers.sliceSum(1, 20, 30, 39, 40, 43)
        val positiveReassessment = answers.sliceSum(15, 18, 23, 28, 29, 45, 48)

        return Result(
                respondentId = respondentId,
                quizId = answersRequestDTO.quizId,
                dateTime = OffsetDateTime.now(ZoneOffset.UTC),
                confrontation = confrontation,
                distancing = distancing,
                selfControl = selfControl,
                seekingSocialSupport = seekingSocialSupport,
                takingResponsibility = takingResponsibility,
                escapeAvoidance = escapeAvoidance,
                problemSolvingPlanning = problemSolvingPlanning,
                positiveReassessment = positiveReassessment,
                confrontationTPoint = calculateTPoint(gender, age, confrontation, LazarusType.CONFRONTATION),
                distancingTPoint = calculateTPoint(gender, age, distancing, LazarusType.DISTANCING),
                selfControlTPoint = calculateTPoint(gender, age, selfControl, LazarusType.SELF_CONTROL),
                seekingSocialSupportTPoint = calculateTPoint(gender, age, seekingSocialSupport,
                        LazarusType.SEEKING_SOCIAL_SUPPORT
                ),
                takingResponsibilityTPoint = calculateTPoint(gender, age, takingResponsibility,
                        LazarusType.TAKING_RESPONSIBILITY
                ),
                escapeAvoidanceTPoint = calculateTPoint(gender, age, escapeAvoidance, LazarusType.ESCAPE_AVOIDANCE),
                problemSolvingPlanningTPoint = calculateTPoint(gender, age, problemSolvingPlanning,
                        LazarusType.PROBLEM_SOLVING_PLANNING
                ),
                positiveReassessmentTPoint = calculateTPoint(gender, age, positiveReassessment,
                        LazarusType.POSITIVE_REASSESSMENT
                ),
                answers = answers.joinToString(","))
    }

    private fun calculateTPoint(gender: Gender, age: Int, initialPoint: Int, lazarusType: LazarusType): Int {
        var tPointIndex = lazarusType.typeOffset
        if (gender == Gender.FEMALE)
            tPointIndex += lazarusType.ageOffset * 4

        tPointIndex += getIndexOfAgeGroup(age) * lazarusType.ageOffset
        tPointIndex += initialPoint
        return tPointsTranslation[tPointIndex]
    }

    private fun getIndexOfAgeGroup(age: Int): Int {
        if (age <= 20) return 0
        if (age in 21..30) return 1
        if (age in 31..40) return 2
        if (age in 41..51) return 3
        if (age in 51..60) return 4
        throw IllegalArgumentException("Too big age! More than 60!")
    }

    private fun List<Int>.sliceSum(vararg indices: Int): Int {
        var sum = 0
        for (i in indices) {
            sum += this[i - 1]
        }
        return sum
    }

    enum class LazarusType(val typeOffset: Int, val ageOffset: Int) {
        CONFRONTATION(0, 19),
        DISTANCING(152, 19),
        SELF_CONTROL(304, 22),
        SEEKING_SOCIAL_SUPPORT(480, 19),
        TAKING_RESPONSIBILITY(632, 13),
        ESCAPE_AVOIDANCE(736, 25),
        PROBLEM_SOLVING_PLANNING(936, 19),
        POSITIVE_REASSESSMENT(1088, 22)
    }
}
