package com.burnoutstopper.fatigueservice.service.result

import com.burnoutstopper.fatigueservice.dto.answers.AnswersRequestDTO
import com.burnoutstopper.fatigueservice.dto.answers.AnswersResponseDTO
import com.burnoutstopper.fatigueservice.dto.page.PageDTO
import com.burnoutstopper.fatigueservice.dto.results.ResultsIdResponseDTO
import com.burnoutstopper.fatigueservice.dto.results.ResultsResponseDTO
import com.burnoutstopper.fatigueservice.exception.NoSuchElementFoundException
import com.burnoutstopper.fatigueservice.mapper.Mapper
import com.burnoutstopper.fatigueservice.model.Result
import com.burnoutstopper.fatigueservice.repository.ResultRepository
import com.burnoutstopper.fatigueservice.service.rest.RestService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import java.time.OffsetDateTime
import java.time.ZoneOffset

@Service
class ResultServiceImpl @Autowired constructor(private val restService: RestService,
                                               private val resultRepository: ResultRepository,
                                               private val mapper: Mapper) : ResultService {
                                                   
    override fun saveResult(answersRequestDTO: AnswersRequestDTO): AnswersResponseDTO {
        val answers = answersRequestDTO.answers
        val fatigueIndex = getFatigueIndex(answers)
        val physicalDiscomfort = getPhysicalDiscomfort(answers)
        val cognitiveDiscomfort = getCognitiveDiscomfort(answers)
        val emotionalViolation = getEmotionalViolation(answers)
        val motivationDecrease = getMotivationDecrease(answers)
        
        val currentToken = answersRequestDTO.token
        val respondentId = if (currentToken.isBlank()) -1 else restService.getRespondentId(currentToken)
        val result = Result(
                respondentId = respondentId,
                dateTime = OffsetDateTime.now(ZoneOffset.UTC),
                quizId = answersRequestDTO.quizId,
                fatigueIndex = fatigueIndex,
                physicalDiscomfort = physicalDiscomfort,
                cognitiveDiscomfort = cognitiveDiscomfort,
                emotionalViolation = emotionalViolation,
                motivationDecrease = motivationDecrease,
                answers = answers.joinToString(",")
        )
        if(respondentId == -1) {
            return AnswersResponseDTO(currentToken, mapper.toResultsResponseDTO(result))    
        }
        
        val savedResult = resultRepository.save(result)
        return AnswersResponseDTO(currentToken, mapper.toResultsResponseDTO(savedResult))
    }

    override fun getResultsByToken(token: String, page: Int, size: Int): PageDTO<ResultsResponseDTO> {
        val respondentId = restService.getRespondentId(token)
        val pageResponse = resultRepository.findAllByRespondentId(respondentId, PageRequest.of(page, size)
                .withSort(Sort.by(Sort.Direction.DESC, "dateTime")))
        return PageDTO(
                total = pageResponse.totalElements,
                page = pageResponse.number,
                size = pageResponse.size,
                data = pageResponse.content.map { mapper.toResultsResponseDTO(it) }
        )
    }

    override fun getResultById(id: Long): ResultsIdResponseDTO {
        val result = resultRepository.findById(id)
                .orElseThrow { throw NoSuchElementFoundException("Result with id $id not found") }

        return mapper.toResultsIdResponseDTO(result)
    }

    override fun getByQuizAndRespondent(quizId: Int, respondentId: Int?): List<ResultsIdResponseDTO> {
        if (respondentId == null) {
            return resultRepository.findAllByQuizId(quizId).map { mapper.toResultsIdResponseDTO(it) }
        }
        return resultRepository.findAllByQuizIdAndRespondentId(quizId, respondentId)
                .map { mapper.toResultsIdResponseDTO(it) }
    }

    override fun existsByQuizAndRespondent(quizId: Int, respondentId: Int?): Boolean {
        if (respondentId == null) {
            return resultRepository.existsByQuizId(quizId)
        }
        return resultRepository.existsByQuizIdAndRespondentId(quizId, respondentId)
    }

    private fun getFatigueIndex(answers: List<Int>): Int {
        val sum1 = answers.sliceSum(
                2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19,
                20, 21, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 34, 35)
        val sum2 = answers.sliceSum(1, 6, 14, 22, 33)
        return sum1 - sum2 + 12
    }

    private fun getPhysicalDiscomfort(answers: List<Int>): Int =
            answers.sliceSum(8, 9, 10, 11, 13, 16, 17, 23, 24, 25, 26, 27, 29, 31, 32)

    private fun getCognitiveDiscomfort(answers: List<Int>): Int =
            answers.sliceSum(1, 3, 4, 5, 19, 20, 21, 34, 35, 36)

    private fun getEmotionalViolation(answers: List<Int>): Int =
            answers.sliceSum(2, 7, 15, 18, 22, 30)

    private fun getMotivationDecrease(answers: List<Int>): Int =
            answers.sliceSum(6, 12, 14, 28, 33)

    private fun List<Int>.sliceSum(vararg indices: Int): Int {
        var sum = 0
        for (i in indices) {
            sum += this[i - 1]
        }
        return sum
    }
}
