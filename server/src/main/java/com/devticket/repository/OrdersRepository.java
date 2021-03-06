package com.devticket.repository;

import com.devticket.model.order.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrdersRepository extends JpaRepository<Orders, Long> {

    Orders findByid(Long id);

    List<Orders> findByUserId(Long id);

    List <Orders> findAll();

}
