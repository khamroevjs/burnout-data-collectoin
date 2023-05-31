package com.burnoutstopper.burnoutservice.controller

import com.burnoutstopper.burnoutservice.dto.answers.AnswersRequestDTO
import com.burnoutstopper.burnoutservice.dto.answers.AnswersResponseDTO
import com.burnoutstopper.burnoutservice.service.result.ResultService
import jakarta.servlet.ServletRequest
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/burnout/v1/answers")
class AnswerController @Autowired constructor(private val resultService: ResultService) {

    private val log = LoggerFactory.getLogger(RestController::class.java)

    @PostMapping
    fun postAnswer(@RequestBody answersRequestDTO: AnswersRequestDTO): AnswersResponseDTO {
        log.info(answersRequestDTO.toString())
        val response = resultService.saveResult(answersRequestDTO)
        log.info(response.toString())
        return response
    }
}
