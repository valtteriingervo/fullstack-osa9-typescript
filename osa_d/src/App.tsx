interface HeaderProps {
  name: string
}

const Header = (props: HeaderProps) => {
  return <h1>{props.name}</h1>
};

// This interface is shared by Content and Total components
interface PartProps {
  parts: Array<{
    name: string,
    exerciseCount: number
  }>
}

const Content = ({ parts }: PartProps) => {
  return (
    <>
      <p>
        {parts[0].name} {parts[0].exerciseCount}
      </p>
      <p>
        {parts[1].name} {parts[1].exerciseCount}
      </p>
      <p>
        {parts[2].name} {parts[2].exerciseCount}
      </p>
    </>
  );
};

const Total = ({ parts }: PartProps) => {
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
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
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