package com.example.main.entity;

import javax.persistence.*;

@Entity
@Table(name = "cars")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    private String num;

    private String color;

    private String mark;

    @Column(name = "is_foreign")
    private boolean isForeign;

    public Car () {
    }

    public Car(String num, String color, String mark, boolean isForeign) {
        this.num = num;
        this.color = color;
        this.mark = mark;
        this.isForeign = isForeign;
    }


    public Long getId() {
        return id;
    }

    public String getNum() {
        return num;
    }

    public String getColor() {
        return color;
    }

    public String getMark() {
        return mark;
    }

    public boolean isIsForeign() {
        return isForeign;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNum(String num) {
        this.num = num;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public void setMark(String mark) {
        this.mark = mark;
    }

    public void setIsForeign(boolean is_foreign) {
        this.isForeign = is_foreign;
    }

    @Override
    public String toString() {
        return "Car{" +
                "id=" + id +
                ", num='" + num + '\'' +
                ", color='" + color + '\'' +
                ", mark='" + mark + '\'' +
                ", is_foreign=" + isForeign +
                '}';
    }
}
