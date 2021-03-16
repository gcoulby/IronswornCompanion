class UniqueKeyGenerator {
  static generate(prefix) {
    return prefix + Math.random().toString(20).substr(2, 6);
  }
}

export default UniqueKeyGenerator;
