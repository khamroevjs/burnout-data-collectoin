package com.burnoutstopper.spbservice.service.result

import com.burnoutstopper.burnoutservice.dto.page.PageDTO
import com.burnoutstopper.spbservice.dto.answers.AnswersRequestDTO
import com.burnoutstopper.spbservice.dto.answers.AnswersResponseDTO
import com.burnoutstopper.spbservice.dto.results.ResultsIdResponseDTO
import com.burnoutstopper.spbservice.dto.results.ResultsResponseDTO
import com.burnoutstopper.spbservice.exception.NoSuchElementFoundException
import com.burnoutstopper.spbservice.mapper.Mapper
import com.burnoutstopper.spbservice.model.Result
import com.burnoutstopper.spbservice.repository.ResultRepository
import com.burnoutstopper.spbservice.service.rest.RestService
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
        val catastrophizing = getCatastrophizing(answers)
        val dutyToSelf = getDutyToSelf(answers)
        val dutyToOthers = getDutyToOthers(answers)
        val lowFrustrationTolerance = getLowFrustrationTolerance(answers)
        val selfEsteem = getSelfEsteem(answers)
        
        val currentToken = answersRequestDTO.token
        val respondentId = if (currentToken.isBlank()) -1 else restService.getRespondentId(currentToken)
        val result = Result(
                respondentId = respondentId,
                dateTime = OffsetDateTime.now(ZoneOffset.UTC),
                quizId = answersRequestDTO.quizId,
                catastrophizing = catastrophizing,
                dutyToSelf = dutyToSelf,
                dutyToOthers = dutyToOthers,
                lowFrustrationTolerance = lowFrustrationTolerance,
                selfEsteem = selfEsteem,
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

    private fun getCatastrophizing(answers: List<Int>): Int {
        return answers.sliceSum(6, 11, 16, 21, 31, 36, 41) + (7 - answers[0]) + (7 - answers[25]) + (7 - answers[45])
    }

    private fun getDutyToSelf(answers: List<Int>): Int {
        return answers.sliceSum(2, 7, 12, 27, 32, 37, 47) + (7 - answers[16]) + (7 - answers[21]) + (7 - answers[41])
    }

    private fun getDutyToOthers(answers: List<Int>): Int {
        return answers.sliceSum(3, 8, 18, 23, 33, 43, 48) + (7 - answers[12]) + (7 - answers[27]) + (7 - answers[37])
    }

    private fun getLowFrustrationTolerance(answers: List<Int>): Int {
        return answers.sliceSum(9, 14, 19, 24, 29, 39, 44) + (7 - answers[3]) + (7 - answers[33]) + (7 - answers[48])
    }

    private fun getSelfEsteem(answers: List<Int>): Int {
        return answers.sliceSum(4, 10, 15, 30, 35, 40, 45, 50) + (7 - answers[19]) + (7 - answers[24])
    }

    private fun List<Int>.sliceSum(vararg indices: Int): Int {
        var sum = 0
        for (i in indices) {
            sum += this[i - 1]
        }
        return sum
    }
}
