class Grade {
    constructor(student) {
        this.studentName = student;
        this.grades = [];
    }

    add(grade) {
        this.grades.push(grade);
    }

    average() {
        const sum = this.grades.reduce((runningSum, currentNumber) => runningSum + currentNumber);
        return (sum / this.grades.length).toFixed(2);
    }
}

const grade = new Grade('John');
grade.add(5.50);
grade.add(6.00);

console.log(`Average grade of ${grade.studentName} is: ${grade.average()}`);