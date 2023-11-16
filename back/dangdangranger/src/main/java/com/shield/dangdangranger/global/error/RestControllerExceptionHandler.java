package com.shield.dangdangranger.global.error;

import com.shield.dangdangranger.global.dto.ResponseDto;
import com.shield.dangdangranger.global.error.mmlog.MatterMostSender;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Enumeration;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(annotations = RestController.class)
@Slf4j
public class RestControllerExceptionHandler {
    @Autowired
    private MatterMostSender matterMostSender;
    @ExceptionHandler(DuplicatedException.class)
    public ResponseEntity<ResponseDto<?>> handleDuplicatedException(DuplicatedException duplicatedException) {
        if (duplicatedException.getParams() == null) {
	    	return ResponseEntity.status(HttpStatus.CONFLICT).body(
	            ResponseDto.create(duplicatedException.getMessage())
	        );
        }
        else {
        	return ResponseEntity.status(HttpStatus.CONFLICT).body(
	            ResponseDto.create(duplicatedException.getMessage(), duplicatedException.getParams())
	        );
        }
    }

    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<ResponseDto<String>> handleForbiddenException(ForbiddenException forbiddenException) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
            ResponseDto.create(forbiddenException.getMessage())
        );
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ResponseDto<String>> handleNotFoundException(NotFoundException notFoundException) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
            ResponseDto.create(notFoundException.getMessage())
        );
    }

    @ExceptionHandler(TokenException.class)
    public ResponseEntity<ResponseDto<String>> handleTokenException(TokenException tokenException) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
            ResponseDto.create(tokenException.getMessage())
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseDto<String>> handleAllUncaughtException(Exception exception, HttpServletRequest httpServletRequest){
        try{
            ServletInputStream servletInputStream = httpServletRequest.getInputStream();
            String json = StreamUtils.copyToString(servletInputStream, StandardCharsets.UTF_8)
                    .replaceAll("\r\n\t", "  ");
            matterMostSender.sendMessage(exception, httpServletRequest.getRequestURL().toString(), httpServletRequest.getMethod(), json);
        }catch(IOException e){
            matterMostSender.sendMessage(exception, httpServletRequest.getRequestURL().toString(), httpServletRequest.getMethod(), getParams(httpServletRequest));
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ResponseDto.create(exception.getMessage()));
    }

    private String getParams(HttpServletRequest httpServletRequest){
        StringBuilder sb = new StringBuilder();
        Enumeration<String> keys = httpServletRequest.getParameterNames();
        while(keys.hasMoreElements()){
            String key = keys.nextElement();
            sb.append("- ").append(key).append(" : ").append(httpServletRequest.getParameter(key)).append("/n");
        }
        return sb.toString();
    }
}
