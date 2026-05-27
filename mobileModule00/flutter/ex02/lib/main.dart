import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: .fromSeed(
          seedColor: const Color.fromARGB(255, 13, 1, 242),
        ),

        textButtonTheme: TextButtonThemeData(
          style: TextButton.styleFrom(
            backgroundColor: const Color.fromARGB(255, 112, 132, 135),
            foregroundColor: const Color.fromARGB(255, 52, 56, 69),
            shape: const RoundedRectangleBorder(
              borderRadius: BorderRadius.zero,
            ),
          ),
        ),

        appBarTheme: const AppBarTheme(
          backgroundColor: Color.fromARGB(255, 29, 57, 156),
          elevation: 8,
          shadowColor: Colors.black,
        ),
      ),
      home: const MyHomePage(title: 'Calculator'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});
  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromARGB(255, 64, 72, 84),
      appBar: AppBar(
        backgroundColor: const Color.fromARGB(255, 112, 132, 135),
        title: Text(widget.title),
      ),
      body: LayoutBuilder(
        builder: (context, constraints) {
          final isPortrait = MediaQuery.of(context).orientation == Orientation.portrait;

          return Column(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              Expanded(
                child: Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    children: [
                      SizedBox(
                        width: double.infinity,
                        child: Text(
                          '0',
                          style: const TextStyle(
                            color: Color.fromARGB(255, 112, 132, 135),
                            fontSize: 48,
                          ),
                          textAlign: TextAlign.right,
                        ),
                      ),
                      SizedBox(
                        width: double.infinity,
                        child: Text(
                          '0',
                          style: const TextStyle(
                            color: Color.fromARGB(255, 112, 132, 135),
                            fontSize: 48,
                          ),
                          textAlign: TextAlign.right,
                        ),
                      )
                    ],
                  ) 
                ),
              ),

              GridView.count(
                crossAxisCount: 5,
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                childAspectRatio: isPortrait ? 0.9 : 4.5,
                children: [
                  TextButton(onPressed: () {}, child: const Text("7")),
                  TextButton(onPressed: () {}, child: const Text("8")),
                  TextButton(onPressed: () {}, child: const Text("9")),

                  TextButton(
                    onPressed: () {},
                    style: TextButton.styleFrom(foregroundColor: Colors.red),
                    child: const Text("C"),
                  ),
                  TextButton(
                    onPressed: () {},
                    style: TextButton.styleFrom(foregroundColor: Colors.red),
                    child: const Text("AC"),
                  ),

                  TextButton(onPressed: () {}, child: const Text("4")),
                  TextButton(onPressed: () {}, child: const Text("5")),
                  TextButton(onPressed: () {}, child: const Text("6")),

                  TextButton(
                    onPressed: () {},
                    style: TextButton.styleFrom(foregroundColor: Colors.white),
                    child: const Text("+"),
                  ),
                  TextButton(
                    onPressed: () {},
                    style: TextButton.styleFrom(foregroundColor: Colors.white),
                    child: const Text("-"),
                  ),

                  TextButton(onPressed: () {}, child: const Text("1")),
                  TextButton(onPressed: () {}, child: const Text("2")),
                  TextButton(onPressed: () {}, child: const Text("3")),

                  TextButton(
                    onPressed: () {},
                    style: TextButton.styleFrom(foregroundColor: Colors.white),
                    child: const Text("x"),
                  ),
                  TextButton(
                    onPressed: () {},
                    style: TextButton.styleFrom(foregroundColor: Colors.white),
                    child: const Text("/"),
                  ),

                  TextButton(onPressed: () {}, child: const Text("0")),
                  TextButton(onPressed: () {}, child: const Text("00")),
                  TextButton(onPressed: () {}, child: const Text(".")),

                  TextButton(
                    onPressed: () {},
                    style: TextButton.styleFrom(foregroundColor: Colors.white),
                    child: const Text("="),
                  ),
                  TextButton(onPressed: () {}, child: const Text("")),
                  // ...
                ],
              ),
            ],
          );
        },
      ),
    );
  }
}
