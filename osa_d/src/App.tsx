// CoursePart intercaes
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseDesc extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartBaseDesc {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackround extends CoursePartBaseDesc {
  backroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartBaseDesc {
  requirements: string[];
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackround | CoursePartSpecial;

// Prop interfaces
interface HeaderProps {
  name: string
}

const Header = (props: HeaderProps) => {
  return <h1>{props.name}</h1>
};

// This interface is shared by Content and Total components
interface PartsProps {
  parts: CoursePart[]
}

interface PartProps {
  course: CoursePart
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ course }: PartProps) => {
  switch (course.kind) {
    case "basic":
      return (
        <div>
          <p>
            <b>{course.name} {course.exerciseCount}</b>
            <br></br>
            <i>{course.description} </i>
          </p>
        </div>
      )
    case "group":
      return (
        <div>
          <p>
            <b>{course.name} {course.exerciseCount}</b>
            <br></br>
            {"Project exercises: "}{course.groupProjectCount}
          </p>
        </div>
      )
    case "background":
      return (
        <div>
          <p>
            <b>{course.name} {course.exerciseCount}</b>
            <br></br>
            <i>{course.description} </i>
            <br></br>
            {"submit to: "} {course.backroundMaterial}
          </p>
        </div>
      )
    case "special":
      return (
        <div>
          <p>
            <b>{course.name} {course.exerciseCount}</b>
            <br></br>
            <i>{course.description} </i>
            <br></br>
            {"required skills: "} {course.requirements.join(", ")}
          </p>
        </div>
      )
    default:
      return assertNever(course);
  }
};

const Content = ({ parts }: PartsProps) => {
  return (
    <>
      <Part course={parts[0]} />
      <Part course={parts[1]} />
      <Part course={parts[2]} />
      <Part course={parts[3]} />
      <Part course={parts[4]} />
      <Part course={parts[5]} />
    </>
  );
};



const Total = ({ parts }: PartsProps) => {
  return (
    <>
      <p>
        Number of exercises{" "}
        {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </>
  );
};

const App = () => {
  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;