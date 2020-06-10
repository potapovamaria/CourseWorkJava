package com.example.main.entity;

import javax.persistence.*;

@Entity
@Table(name = "services")
public class Services {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    private String name;
    @Column(name = "cost_our")
    private Integer costOur;
    @Column(name = "cost_foreign")
    private Integer costForeign;

    public Services() {
    }

    public Services(String name, Integer costForeign, Integer costOur) {
        this.costForeign = costForeign;
        this.costOur = costOur;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Integer getCostOur() {
        return costOur;
    }

    public Integer getCostForeign() {
        return costForeign;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCostOur(Integer cost_our) {
        this.costOur = cost_our;
    }

    public void setCostForeign(Integer cost_foreign) {
        this.costForeign = cost_foreign;
    }

    @Override
    public String toString() {
        return "Services{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", cost_our=" + costOur +
                ", cost_foreign=" + costForeign +
                '}';
    }
}
