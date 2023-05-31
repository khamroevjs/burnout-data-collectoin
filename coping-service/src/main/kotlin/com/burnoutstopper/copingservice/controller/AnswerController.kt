package com.burnoutstopper.copingservice.controller

import com.burnoutstopper.copingservice.dto.answers.AnswersRequestDTO
import com.burnoutstopper.copingservice.dto.answers.AnswersResponseDTO
import com.burnoutstopper.copingservice.service.result.ResultService
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/coping/v1/answers")
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
