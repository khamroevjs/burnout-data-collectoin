package com.burnoutstopper.burnoutservice.service.result

import com.burnoutstopper.burnoutservice.dto.answers.AnswersRequestDTO
import com.burnoutstopper.burnoutservice.dto.answers.AnswersResponseDTO
import com.burnoutstopper.burnoutservice.dto.page.PageDTO
import com.burnoutstopper.burnoutservice.dto.results.ResultsIdResponseDTO
import com.burnoutstopper.burnoutservice.dto.results.ResultsResponseDTO
import com.burnoutstopper.burnoutservice.exception.NoSuchElementFoundException
import com.burnoutstopper.burnoutservice.mapper.Mapper
import com.burnoutstopper.burnoutservice.model.Result
import com.burnoutstopper.burnoutservice.repository.ResultRepository
import com.burnoutstopper.burnoutservice.service.rest.RestService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import java.math.BigDecimal
import java.time.OffsetDateTime
import java.time.ZoneOffset
import kotlin.math.round
import kotlin.math.sqrt


@Service
class ResultServiceImpl @Autowired constructor(private val restService: RestService,
                                               private val resultRepository: ResultRepository,
                                               private val mapper: Mapper) : ResultService {
    override fun saveResult(answersRequestDTO: AnswersRequestDTO): AnswersResponseDTO {
        val answers = answersRequestDTO.answers
        val exhaustion = getExhaustion(answers)
        val depersonalization = getDepersonalization(answers)
        val reduction = getReduction(answers)
        val integralIndex = getIntegralIndex(exhaustion, depersonalization, reduction)
        
        val currentToken = answersRequestDTO.token
        val respondentId = if (currentToken.isBlank()) -1 else restService.getRespondentId(currentToken)
        val result = Result(
                respondentId = respondentId,
                dateTime = OffsetDateTime.now(ZoneOffset.UTC),
                quizId = answersRequestDTO.quizId,
                exhaustion = exhaustion,
                depersonalization = depersonalization,
                reduction = reduction,
                integralIndex = integralIndex,
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

    private fun getExhaustion(answers: List<Int>): Int =
            answers.sliceSum(1, 2, 3, 8, 13, 14, 16, 20) + 6 - answers[5]

    private fun getDepersonalization(answers: List<Int>): Int =
            answers.sliceSum(5, 10, 11, 15, 22)

    private fun getReduction(answers: List<Int>): Int =
            answers.sliceSum(4, 6, 7, 9, 12, 17, 18, 19, 21)

    private fun getIntegralIndex(exhaustion: Int, depersonalization: Int, reduction: Int): BigDecimal {
        val one = exhaustion / 54.0
        val two = depersonalization / 30.0
        val tree = (1 - reduction / 48.0)
        val result = sqrt((one * one + two * two + tree * tree) / 3.0)
        return (round(result * 100.0) / 100.0).toBigDecimal()
    }

    private fun List<Int>.sliceSum(vararg indices: Int): Int {
        var sum = 0
        for (i in indices) {
            sum += this[i - 1]
        }
        return sum
    }
}
