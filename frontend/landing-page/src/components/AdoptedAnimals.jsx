const AdoptedAnimals = () => {
  return (
    <Section id="adopted-animals">
      <Heading title="Meet Our Adopted Elephants" />
      <div className="flex flex-wrap">
        {/* Example of an adopted animal card */}
        <div className="w-full md:w-1/3 p-4">
          <div className="border rounded-lg p-4">
            <h4 className="h4">Elephant Name</h4>
            <p className="body-2">Details about the adopted elephant.</p>
            <Button href="#">Interact</Button>
          </div>
        </div>
        {/* Repeat for more animals */}
      </div>
    </Section>
  );
};

export default AdoptedAnimals; 