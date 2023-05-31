package com.burnoutstopper.copingservice.service.result

import com.burnoutstopper.copingservice.dto.answers.AnswersRequestDTO
import com.burnoutstopper.copingservice.dto.answers.AnswersResponseDTO
import com.burnoutstopper.copingservice.dto.mapper.Mapper
import com.burnoutstopper.copingservice.dto.page.PageDTO
import com.burnoutstopper.copingservice.dto.results.ResultsIdResponseDTO
import com.burnoutstopper.copingservice.dto.results.ResultsResponseDTO
import com.burnoutstopper.copingservice.exception.NoSuchElementFoundException
import com.burnoutstopper.copingservice.repository.ResultRepository
import com.burnoutstopper.copingservice.service.calculate.CalculateService
import com.burnoutstopper.copingservice.service.rest.RestService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service

@Service
class ResultServiceImpl @Autowired constructor(private val restService: RestService,
                                               private val resultRepository: ResultRepository,
                                               private val calculateService: CalculateService,
                                               private val mapper: Mapper) : ResultService {

    override fun saveResult(answersRequestDTO: AnswersRequestDTO): AnswersResponseDTO {
        val currentToken = answersRequestDTO.token
        val respondentId = if (currentToken.isBlank()) -1 else restService.getRespondentId(currentToken)

        val result = calculateService.calculateResult(answersRequestDTO, respondentId)
        if (respondentId == -1) {
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
}
