import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(colorScheme: .fromSeed(seedColor: Colors.deepPurple)),
      home: const MyHomePage(title: ''),
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
  String text = 'TEST';
  bool _isToggled = false;

  void _changeText() {
    setState(() {
      if (_isToggled == false) {
        _isToggled = true;
        text = 'Hello World';
      }
      else {
        text = 'TEST';
        _isToggled = false;
      }
    });
    debugPrint("Button pressed");
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(

        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(''),
            Container (
              decoration: BoxDecoration(
                color:  const Color.fromARGB(255, 156, 37, 37),
                borderRadius: BorderRadius.circular(12),
              ),
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: Text(
                text,
                style: Theme.of(context).textTheme.headlineMedium  
              ),
            ),
              const SizedBox(height: 20),
          
              ElevatedButton(
                onPressed: _changeText,
                child: const Text("Click me"),
              ),
          ],
        ),
      ),
    );
  }
}
